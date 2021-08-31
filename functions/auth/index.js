const functions = require("firebase-functions");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");
// const BnetStrategy = require("passport-bnet").Strategy;

// Firebase Setup
// const admin = require("firebase-admin");
// const db = admin.firestore();
// const FieldValue = admin.firestore.FieldValue;

// const blizzard = require("blizzard.js");

const OAUTH_REDIRECT_URI = "https://us-central1-gdn-bot.cloudfunctions.net/auth-battlenetToken";
const OAUTH_SCOPES = "wow.profile";
const OAUTH_GRANT_TYPE = "client_credentials";

// /**
//  *
//  * Creates a configured simple-oauth2 client for BattleNet.
//  *
//  * @returns
//  */
// function battlenetOAuth2Client() {
//   // BattleNet OAuth 2 setup
//   const credentials = {
//     client: {
//       id: functions.config().battlenet.id,
//       secret: functions.config().battlenet.secret,
//     },
//     auth: {
//       tokenHost: "https://eu.battle.net",
//       tokenPath: "/oauth/authorize",
//     },
//   };

//   return require("simple-oauth2").create(credentials);
// }

/**
 * Redirects the User to the BattleNet authentication consent screen. Also the 'state' cookie is set for later state
 * verification.
 */
exports.battlenetRedirect = functions
    .https
    .onRequest(async (req, res) => {
      cookieParser()(req, res, () => {
        const state = req.cookies.state || crypto.randomBytes(20).toString("hex");
        functions.logger.log("Setting verification state:", state);

        res.cookie("state", state.toString(), {maxAge: 3600000, secure: true, httpOnly: true});

        const authorizeURL =
          "https://eu.battle.net/oauth/authorize?" +
          `scope=${OAUTH_SCOPES}&` +
          "response_type=code&" +
          `redirect_uri=${OAUTH_REDIRECT_URI}&` +
          `state=${state}&` +
          `client_id=${functions.config().battlenet.id}`;
        functions.logger.log("authorizeURL", authorizeURL);
        res.redirect(authorizeURL);
      });
    });

/**
* Exchanges a given BattleNet auth code passed in the 'code' URL query parameter for a Firebase auth token.
* The request also needs to specify a 'state' query parameter which will be checked against the 'state' cookie.
* The Firebase custom auth token is sent back in a JSONP callback function with function name defined by the
* 'callback' query parameter.
*/
exports.battlenetToken = functions.https.onRequest((req, res) => {
  try {
    functions.logger.log("battlenetToken INI req", req);
    functions.logger.log("battlenetToken INI res", res);

    cookieParser()(req, res, () => {
      functions.logger.log("Received verification state:", req.cookies.state);
      functions.logger.log("Received state:", req.query.state);

      if (!req.cookies.state) {
        throw new Error("State cookie not set or expired. Maybe you took too long to authorize. Please try again.");
      } else if (req.cookies.state !== req.query.state) {
        throw new Error("State validation failed");
      }

      functions.logger.log("Received auth code:", req.query.code);

      const grantURL =
        "https://eu.battle.net/oauth/token?" +
        `scope=${OAUTH_SCOPES}&` +
        `code=${req.query.code}&` +
        `grant_type=${OAUTH_GRANT_TYPE}`;
      functions.logger.log("grantURL", grantURL);

      res.redirect("https://gdn-bot.web.app/");
      // Spotify.authorizationCodeGrant(req.query.code, (error, data) => {
      //   if (error) {
      //     throw error;
      //   }
      //   functions.logger.log(
      //       "Received Access Token:",
      //       data.body["access_token"],
      //   );
      //   Spotify.setAccessToken(data.body["access_token"]);

      //   Spotify.getMe(async (error, userResults) => {
      //     if (error) {
      //       throw error;
      //     }
      //     functions.logger.log(
      //         "Auth code exchange result received:",
      //         userResults,
      //     );
      //     // We have a Spotify access token and the user identity now.
      //     const accessToken = data.body["access_token"];
      //     const spotifyUserID = userResults.body["id"];
      //     const profilePic = userResults.body["images"][0]["url"];
      //     const userName = userResults.body["display_name"];
      //     const email = userResults.body["email"];

      //     // Create a Firebase account and get the Custom Auth Token.
      //     const firebaseToken = await createFirebaseAccount(spotifyUserID, userName, profilePic, email, accessToken);
      //     // Serve an HTML page that signs the user in and updates the user profile.
      //     res.jsonp({token: firebaseToken});
      //   });
      // });
    });
  } catch (error) {
    res.jsonp({error: error.toString()});
  }
  return null;
});
