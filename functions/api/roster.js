/* eslint-disable new-cap */
const {Router} = require("express");
const router = Router();

const admin = require("firebase-admin");
const db = admin.firestore();

const blizzard = require("blizzard.js");

const runtimeOpts = {
    timeoutSeconds: 300,
    memory: "512MB",
};

router.get("/roster", async (req, res) => {
  try {
    const query = db.collection("characters");
    const querySnapshot = await query.get();
    const docs = querySnapshot.docs;

    const response = docs.map((doc) => (doc.data()));

    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
