const functions = require("firebase-functions");
const axios = require("axios").default;

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");

  axios.get("https://www.wowprogress.com/guild/eu/sanguino/Gremio+de+Nordrassil/json_rank/")
      .then(function(response) {
        console.log(response.data);
        functions.logger
            .info("WowProgress_Update", {wp_update: response.data});
      });
});

exports.scheduledFunction = functions.pubsub.schedule("30 2 * * *")
    .timeZone("Europe/Madrid").onRun((context) => {
      console.info("This will be run every day at 2:30 AM!");

      axios.get("https://www.wowprogress.com/guild/eu/sanguino/Gremio+de+Nordrassil/json_rank/")
          .then(function(response) {
            console.log(response.data);
            functions.logger
                .info("WowProgress_Update", {wp_update: response.data});
          });

      return null;
    });
