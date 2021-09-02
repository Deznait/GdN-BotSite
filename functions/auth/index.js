const functions = require("firebase-functions");

const {AuthorizationCode} = require("simple-oauth2");
const crypto = require("crypto");

// Firebase Setup
const admin = require("firebase-admin");
const db = admin.firestore();
// const blizzard = require("blizzard.js");
const cors = require("cors")({origin: true});

const OAUTH_REDIRECT_URI = `https://${process.env.GCLOUD_PROJECT}.web.app/popup`;
const OAUTH_SCOPES = "wow.profile";


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
 * Redirects the User to the BattleNet authentication consent screen.
 */
exports.battlenetRedirect = functions.region("europe-west1").https.onRequest((req, res) => {
  const oauth2 = battleNetOAuth2Client();

  const state = crypto.randomBytes(20).toString("hex");

  const redirectUri = oauth2.authorizeURL({
    redirect_uri: OAUTH_REDIRECT_URI,
    scope: OAUTH_SCOPES,
    state: state,
  });

  res.redirect(redirectUri);
});

/**
* Exchanges a given BattleNet auth code passed in the 'code' URL query parameter for a Firebase auth token.
* The request also needs to specify a 'state' query parameter which will be checked against the 'state' cookie.
* The Firebase custom auth token is sent back in a JSONP callback function with function name defined by the
* 'callback' query parameter.
*/
exports.battlenetToken = functions.region("europe-west1").https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    const oauth2 = battleNetOAuth2Client();

    try {
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

      return res.jsonp({token: firebaseToken});
    } catch (error) {
      res.jsonp({error: error.toString()});
    }
  });
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
  const photoURL = "https://render-us.worldofwarcraft.com/character/tichondrius/00/000000000-avatar.jpg?alt=/shadow/avatar/2-1.jpg";

  // Save the access token to the Firestore Database.
  const databaseTask = db.collection("users").doc(uid).set({
    uid: uid,
    characters: {},
    battletag: battletag,
  });

  // Create or update the user account.
  const userCreationTask = admin.auth().updateUser(uid, {
    displayName: battletag,
    photoURL: photoURL,
  }).catch((error) => {
    // If user does not exists we create it.
    if (error.code === "auth/user-not-found") {
      return admin.auth().createUser({
        uid: uid,
        displayName: battletag,
        photoURL: photoURL,
      });
    }
    throw error;
  });


  // Wait for all async tasks to complete, then generate and return a custom auth token.
  await Promise.all([userCreationTask, databaseTask]);
  // Create a Firebase custom auth token.
  const token = await admin.auth().createCustomToken(uid);
  functions.logger.log(
      "Created Custom token for UID \"",
      uid,
      "\" Token:",
      token,
  );

  return token;
}
