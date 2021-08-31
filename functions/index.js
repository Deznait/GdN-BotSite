const admin = require("firebase-admin");
admin.initializeApp();

// Scheduled functions (Execute X timed a day, at specific times...)
exports.scheduled = require("./scheduled/index");


// Auth functions
exports.auth = require("./auth/index");

// Express API functions
exports.api = require("./api/index");
