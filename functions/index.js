const admin = require("firebase-admin");
admin.initializeApp();

// Scheduled functions (Execute X timed a day, at specific times...)
exports.scheduled = require("./scheduled/index");

// Express API functions
exports.api = require("./api/index");
