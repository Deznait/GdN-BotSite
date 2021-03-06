const functions = require("firebase-functions");

const admin = require("firebase-admin");
const db = admin.firestore();
const FieldValue = admin.firestore.FieldValue;

const blizzard = require("blizzard.js");
const cheerio = require("cheerio");
const axios = require("axios").default;

const runtimeOpts = {
  timeoutSeconds: 300,
  memory: "512MB",
};

/**
 *
 */
async function executeUpdateGuildRoster() {
  functions.logger.log("Start updating the roster!");

  const wowClient = await blizzard.wow.createInstance({
    key: functions.config().battlenet.id,
    secret: functions.config().battlenet.secret,
    origin: "eu",
    locale: "es_ES",
  });

  const guild = await wowClient.guild({
    realm: "sanguino",
    name: "gremio-de-nordrassil",
    resource: "roster",
  });

  const characterRef = db.collection("characters");
  guild.data.members.forEach(async (member) => {
    try {
      const memberObj = {
        name: member.character.name,
        race: member.character.playable_race.id,
        rank: member.rank,
        realm: member.character.realm.slug,
      };

      characterRef.doc("_" + member.character.id).update(memberObj).then(() => {
        // Character exists
        functions.logger.log("Character successfully updated! => ", memberObj.name);
      })
          .catch(() => {
          // Character does not exist
            memberObj.id = member.character.id;
            memberObj.class = member.character.playable_class.id;
            memberObj.assets = {};
            memberObj.alts = {};
            memberObj.points_total = 0;

            characterRef.doc("_" + member.character.id).set(memberObj, {merge: true}).then(() => {
              functions.logger.log("Character successfully created! => ", memberObj.name);
              characterRef.doc("_" + member.character.id).collection("points").add({
                value: 0,
                type: "init",
                label: "Valor inicial",
                timestamp: FieldValue.serverTimestamp(),
              });
            });
          });
    } catch (error) {
      functions.logger.error("Error! => ", error);
    }
  });

  functions.logger.log("Finished updating the roster!");
}

/**
 *
 */
async function executeUpdateWowProgress() {
  functions.logger.log("Start updating WowProgress!");

  axios.get("https://www.wowprogress.com/guild/eu/sanguino/Gremio+de+Nordrassil")
      .then(function(res) {
        const $ = cheerio.load(res.data);
        const arrayMap = ["world_rank", "area_rank", "region_rank", "realm_rank"];
        const guildData = {
          world_rank: {
            label: "World",
            url: "https://www.wowprogress.com/pve/world",
            progress: "",
            ilvl: "",
          },
          area_rank: {
            label: "EU",
            url: "https://www.wowprogress.com/pve/eu",
            progress: "",
            ilvl: "",
          },
          region_rank: {
            label: "ES",
            url: "https://www.wowprogress.com/pve/es",
            progress: "",
            ilvl: "",
          },
          realm_rank: {
            label: "Realm",
            url: "https://www.wowprogress.com/pve/eu/connected-sanguino",
            progress: "",
            ilvl: "",
          },
        };
        const progressValues = $(".primary > table:nth-child(9) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr td + td");
        const ilvlValues = $(".primary > table:nth-child(9) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > table:nth-child(2) > tbody:nth-child(1) > tr td + td");

        progressValues.each((index, element) => {
          guildData[arrayMap[index]].progress = $(element).text();
        });
        ilvlValues.each((index, element) => {
          guildData[arrayMap[index]].ilvl = $(element).text();
        });

        db.collection("wowprogress").doc("data").set(guildData)
            .then(() => {
              functions.logger
                  .log("WowProgress_Update - OK", {wp_update: guildData});
            }).catch((error) => {
              functions.logger
                  .error("WowProgress_Update - KO", {error: error});
            });
      }).catch((error) => {
        functions.logger
            .error("Axios Get - KO", {error: error});
      });

  functions.logger.log("Finished updating WowProgress!");
}

exports.manualUpdateRoster = functions
    .runWith(runtimeOpts)
    .region("europe-west1")
    .https
    .onRequest(async () => {
      executeUpdateGuildRoster();
    });

exports.updateGuildRoster = functions
    .runWith(runtimeOpts)
    .region("europe-west1")
    .pubsub.schedule("30 2 * * *")
    .timeZone("Europe/Madrid")
    .onRun(async () => {
      executeUpdateGuildRoster();
    });

exports.manualupdateWowProgress = functions
    .region("europe-west1")
    .https
    .onRequest(async () => {
      executeUpdateWowProgress();
    });

exports.updateWowProgress = functions
    .region("europe-west1")
    .pubsub.schedule("30 2 * * *")
    .timeZone("Europe/Madrid")
    .onRun(async () => {
      executeUpdateWowProgress();
    });
