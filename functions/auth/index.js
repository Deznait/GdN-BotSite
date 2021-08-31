const functions = require("firebase-functions");

const {AuthorizationCode} = require("simple-oauth2");
const cookieParser = require("cookie-parser");
const crypto = require("crypto");

// Firebase Setup
const admin = require("firebase-admin");
const db = admin.firestore();
// const blizzard = require("blizzard.js");

const OAUTH_REDIRECT_URI = "https://europe-west1-gdn-bot.cloudfunctions.net/auth-battlenetToken";
const OAUTH_SCOPES = "wow.profile";
// const OAUTH_GRANT_TYPE = "authorization_code";


/**
 * Creates a configured simple-oauth2 client for BattleNet.
 *
 * @return {any} Simple OAuth Object
 */
function battleNetOAuth2Client() {
  const credentials = {
    client: {
      id: functions.config().battlenet.id,
      secret: functions.config().battlenet.secret,
    },
    auth: {
      tokenHost: "https://eu.battle.net",
    },
  };

  return new AuthorizationCode(credentials);
}

/**
 * Redirects the User to the BattleNet authentication consent screen. Also the 'state' cookie is set for later state
 * verification.
 */
exports.battlenetRedirect = functions.region("europe-west1").https.onRequest((req, res) => {
  const oauth2 = battleNetOAuth2Client();

  cookieParser()(req, res, () => {
    const state = req.cookies.state || crypto.randomBytes(20).toString("hex");

    res.cookie("state", state.toString(), {maxAge: 3600000, secure: true, httpOnly: true});

    const redirectUri = oauth2.authorizeURL({
      redirect_uri: OAUTH_REDIRECT_URI,
      scope: OAUTH_SCOPES,
      state: state,
    });

    res.redirect(redirectUri);
  });
});

/**
* Exchanges a given BattleNet auth code passed in the 'code' URL query parameter for a Firebase auth token.
* The request also needs to specify a 'state' query parameter which will be checked against the 'state' cookie.
* The Firebase custom auth token is sent back in a JSONP callback function with function name defined by the
* 'callback' query parameter.
*/
exports.battlenetToken = functions.region("europe-west1").https.onRequest((req, res) => {
  const oauth2 = battleNetOAuth2Client();

  try {
    cookieParser()(req, res, async () => {
      if (!req.cookies.state) {
        throw new Error("State cookie not set or expired. Maybe you took too long to authorize. Please try again.");
      } else if (req.cookies.state !== req.query.state) {
        throw new Error("State validation failed");
      }

      const results = await oauth2.getToken({
        redirect_uri: OAUTH_REDIRECT_URI,
        scope: OAUTH_SCOPES,
        code: req.query.code,
      });
      functions.logger.log("Auth code exchange result received:", results);

      // We have a BattleNet access token and the user identity now.
      const battleNetUserID = results.token.sub;

      // Create a Firebase account and get the Custom Auth Token.
      const firebaseToken = await createFirebaseAccount(battleNetUserID);
      functions.logger.log("firebaseToken", firebaseToken);

      return res.jsonp({token: firebaseToken});
    });
  } catch (error) {
    res.jsonp({error: error.toString()});
  }
});

/**
 * Creates a Firebase account with the given user profile and returns a custom auth token allowing
 * signing-in this account.
 *
 * @param {String} battleNetUserID
 *
 * @return {Promise<string>} The Firebase custom auth token in a promise.
 */
async function createFirebaseAccount(battleNetUserID) {
  // The UID we'll assign to the user.
  const uid = `battlenet:${battleNetUserID}`;

  // TODO Recover the user info from Blizz
  const battletag = "XXXXX#1234";

  functions.logger.log("Creating user (firestore):", uid);
  // Save the access token to the Firestore Database.
  await db.collection("users").doc(uid).set({
    uid: uid,
    characters: {},
    battletag: battletag,
  });

  // Create or update the user account.
  try {
    functions.logger.log("Updating user:", uid + " + " + battletag);
    return await admin.auth().updateUser(
        uid,
        {
          displayName: battletag,
        });
  } catch (err) {
    functions.logger.log("Creating user:", uid + " + " + battletag);
    // new user
    return await admin.auth().createUser({
      uid: uid,
      displayName: battletag,
    });
  }
}
