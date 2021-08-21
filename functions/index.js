const admin = require("firebase-admin");
const functions = require("firebase-functions");
const axios = require("axios").default;
const url = require("url");

// const express = require("express");

admin.initializeApp(functions.config().firebase);

const dataMembers = require("./members.js");

exports.callBlizzard = functions
    .region("europe-west1")
    .https
    .onRequest((request, response) => {
      response.send("Blizzard llamado");
      const params = new url.URLSearchParams({
        "grant_type": "client_credentials",
        "scope": "wow.profile",
      });

      axios.request({
        method: "POST",
        baseURL: "https://eu.battle.net",
        url: "/oauth/token",
        auth: {
          username: functions.config().battlenet.id, // This is the client_id
          password: functions.config().battlenet.secret, // This is the client_secret
        },
        data: params.toString(),
      })
          .then(function(response) {
            functions.logger
                .info("Response - OK", {response: response.data});
          }).catch(function(error) {
            functions.logger
                .error("Response - KO", {error: error});
          });
    });

exports.updateMembers = functions
    .region("europe-west1")
    .https
    .onRequest((request, response) => {
      response.send("Miembros actualizados");
      const db = admin.firestore();

      const characterRef = db.collection("characters");

      dataMembers.members.forEach((member) => {
        const memberObj = {
          "name": member.character.name,
          "class": member.character.playable_class.id,
          "rank": member.rank,
          "realm": member.character.realm.slug,
          "media": {
            "avatar": null,
            "inset": null,
            "main": null,
            "main-raw": null,
          },
        };

        characterRef.doc("_" + member.character.id).update(memberObj).then(() => {
        // Character exists
          console.info("Character successfully updated! => ", memberObj);
        })
            .catch(() => {
              // Character does not exist
              memberObj.alts = {};
              memberObj.points = {};
              memberObj.points_total = 0;
              characterRef.doc("_" + member.character.id).set(memberObj, {merge: true}).then(() => {
                console.info("Character successfully created! => ", memberObj);
              });
            });
      });
    });

exports.testUpdate = functions
    .region("europe-west1")
    .https
    .onRequest((request, response) => {
      response.send("Hello from Firebase!");
      const db = admin.firestore();

      axios.get("https://www.wowprogress.com/guild/eu/sanguino/Gremio+de+Nordrassil/json_rank/")
          .then(function(response) {
            db.collection("wowprogress").doc("data").set(response.data)
                .then(() => {
                  functions.logger
                      .info("WowProgress_Update - OK", {wp_update: response.data});
                }).catch((error) => {
                  functions.logger
                      .error("WowProgress_Update - KO", {error: error});
                });
          });
    });

exports.updateWowProgress = functions
    .region("europe-west1")
    .pubsub.schedule("30 2 * * *")
    .timeZone("Europe/Madrid")
    .onRun(() => {
      const db = admin.firestore();

      axios.get("https://www.wowprogress.com/guild/eu/sanguino/Gremio+de+Nordrassil/json_rank/")
          .then(function(response) {
            db.collection("wowprogress").doc("data").set(response.data)
                .then(() => {
                  functions.logger
                      .info("WowProgress_Update - OK", {wp_update: response.data});
                }).catch((error) => {
                  functions.logger
                      .error("WowProgress_Update - KO", {error: error});
                });
          });

      return null;
    });
