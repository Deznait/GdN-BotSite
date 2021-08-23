const functions = require("firebase-functions");

const express = require("express");
const app = express();

const admin = require("firebase-admin");
const db = admin.firestore();

const cors = require("cors");

const setCache = function(req, res, next) {
  // here you can define period in second, this one is 1 hour
  const maxAge = 60 * 60;
  const sMaxAge = maxAge * 2;

  // you only want to cache for GET requests
  if (req.method == "GET") {
    res.set("Cache-control", `public, max-age=${maxAge}, s-maxage=${sMaxAge}`);
  } else {
    // for the other requests set strict no caching parameters
    res.set("Cache-control", "no-store");
  }

  // remember to call next() to pass on the request
  next();
};
app.use(setCache);

app.use(cors({origin: true}));

// Routes
app.use(require("./roster"));

app.get("/", (req, res) => {
  return res.status(200).json({message: "Hello World!"});
});

exports.v1 = functions.region("europe-west1").https.onRequest(app);
