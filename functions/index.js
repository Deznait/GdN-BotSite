const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

exports.scheduledFunction = functions.pubsub.schedule("5 11 * * *")
    .timeZone("Europe/Madrid").onRun((context) => {
      functions.logger.info("Hello logs!", {structuredData: true});
      console.info("This will be run every day at 11:05 AM!");
      return null;
    });
