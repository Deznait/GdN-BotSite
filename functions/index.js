const admin = require("firebase-admin");
admin.initializeApp();

// Scheduled functions (Execute X timed a day, at specific times...)
exports.scheduled = require("./scheduled/index");

// Express API functions
exports.api = require("./api/index");


const functions = require("firebase-functions");

exports.newApi = functions.region("europe-west1").https.onRequest((req, res) => {
  return res.status(200).json({message: "Hello World!"});
});
