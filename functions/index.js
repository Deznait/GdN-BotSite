const admin = require("firebase-admin");
const functions = require("firebase-functions");
const axios = require("axios").default;
const blizzard = require("blizzard.js");
// const express = require("express");

admin.initializeApp(functions.config().firebase);

const runtimeOpts = {
  timeoutSeconds: 300,
  memory: "512MB",
};

exports.callBlizzard = functions
    .runWith(runtimeOpts)
    .region("europe-west1")
    .https
    .onRequest(async (req, res) => {
      console.info("Start updating the roster!");

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

      const characterRef = admin.firestore().collection("characters");
      const FieldValue = admin.firestore.FieldValue;
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
            console.info("Character successfully updated! => ", memberObj.name);
          })
              .catch(() => {
                // Character does not exist
                memberObj.id = member.character.id;
                memberObj.class = member.character.playable_class.id;
                memberObj.assets = {};
                memberObj.alts = {};
                memberObj.points_total = 0;

                characterRef.doc("_" + member.character.id).set(memberObj, {merge: true}).then(() => {
                  console.info("Character successfully created! => ", memberObj.name);
                  characterRef.doc("_" + member.character.id).collection("points").add({
                    value: 0,
                    type: "init",
                    label: "Valor inicial",
                    timestamp: FieldValue.serverTimestamp(),
                  });
                });
              });
        } catch (error) {
          console.error("Error! => ", error);
        }
      });

      console.info("Finished updating the roster!");
    });

exports.updateGuildRoster = functions
    .runWith(runtimeOpts)
    .region("europe-west1")
    .pubsub.schedule("30 2 * * *")
    .timeZone("Europe/Madrid")
    .onRun(async (req, res) => {
      console.info("Start updating the roster!");

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

      const characterRef = admin.firestore().collection("characters");
      guild.data.members.forEach(async (member) => {
        try {
          const memberObj = {
            "id": member.character.id,
            "name": member.character.name,
            "class": member.character.playable_class.id,
            "race": member.character.playable_race.id,
            "rank": member.rank,
            "realm": member.character.realm.slug,
            "assets": {},
          };

          characterRef.doc("_" + member.character.id).update(memberObj).then(() => {
          // Character exists
            console.info("Character successfully updated! => ", memberObj.name);
          })
              .catch(() => {
                // Character does not exist
                memberObj.alts = {};
                memberObj.points_total = 0;
                characterRef.doc("_" + member.character.id).set(memberObj, {merge: true}).then(() => {
                  console.info("Character successfully created! => ", memberObj.name);
                  characterRef.doc("_" + member.character.id).collection("points");
                });
              });
        } catch (error) {
          console.error("Error! => ", error);
        }
      });


      console.info("Finished updating the roster!");
    });

exports.updateWowProgress = functions
    .region("europe-west1")
    .pubsub.schedule("30 2 * * *")
    .timeZone("Europe/Madrid")
    .onRun(() => {
      const db = admin.firestore();

      axios.get("https://www.wowprogress.com/guild/eu/sanguino/Gremio+de+Nordrassil/json_rank/")
          .then(function(response) {
            db.collection("wowprogress").doc("data").set(response.data)
                .then(() => {
                  functions.logger
                      .info("WowProgress_Update - OK", {wp_update: response.data});
                }).catch((error) => {
                  functions.logger
                      .error("WowProgress_Update - KO", {error: error});
                });
          });

      return null;
    });
