const functions = require("firebase-functions");
const axios = require("axios").default;
const admin = require("firebase-admin");
admin.initializeApp();

exports.testUpdate = functions
    .region("europe-west1")
    .https
    .onRequest((request, response) => {
      response.send("Hello from Firebase!");
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
