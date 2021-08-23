const functions = require("firebase-functions");

const express = require("express");
const app = express();

const cors = require("cors");

app.use(cors({origin: true}));

app.get("/hello-world", (req, res) => {
  return res.status(200).json({message: "Hello World!"});
});

// Routes
app.use(require("./roster"));

exports.v1 = functions.https.onRequest(app);
