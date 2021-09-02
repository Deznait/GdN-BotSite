const admin = require("firebase-admin");
const serviceAccount = require("./service-account.json");
admin.initializeApp(
    {
      credential: admin.credential.cert(serviceAccount),
    },
);

// Scheduled functions (Execute X timed a day, at specific times...)
exports.scheduled = require("./scheduled/index");

// Auth functions
exports.auth = require("./auth/index");

// Express API functions
exports.api = require("./api/index");
