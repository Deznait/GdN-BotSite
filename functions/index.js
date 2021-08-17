const functions = require("firebase-functions");
const axios = require("axios").default;

exports.testUpdate = functions
    .region("europe-west1")
    .https
    .onRequest((request, response) => {
      response.send("Hello from Firebase!");

      axios.get("https://www.wowprogress.com/guild/eu/sanguino/Gremio+de+Nordrassil/json_rank/")
          .then(function(response) {
            console.log(response.data);
            functions.logger
                .info("WowProgress_Update_Request", {wp_update: response.data});
          });
    });

exports.scheduledFunction = functions
    .region("europe-west1")
    .pubsub.schedule("30 2 * * *")
    .timeZone("Europe/Madrid")
    .onRun((context) => {
      console.info("This will be run every day at 2:30 AM!");

      axios.get("https://www.wowprogress.com/guild/eu/sanguino/Gremio+de+Nordrassil/json_rank/")
          .then(function(response) {
            console.log(response.data);
            functions.logger
                .info("WowProgress_Update_Schedul", {wp_update: response.data});
          });

      return null;
    });
