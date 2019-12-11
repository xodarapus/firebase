const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
const fs = require('fs');
admin.initializeApp();


const raw = fs.readFileSync('./tdk.json');
const dict = JSON.parse(raw);
const version = 17;
// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.dict = functions.https.onRequest(async (req, res) => {
    // Grab the text parameter.
    const original = req.query.text;

    res.header("Access-Control-Allow-Origin", "*");
 

    // Push the new message into the Realtime Database using the Firebase Admin SDK.
    //const snapshot = await admin.database().ref('/messages').push({original: original});
    // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    //res.redirect(303, snapshot.ref.toString());
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(dict));
  });

exports.version = functions.https.onRequest(async (req, res) => {
    
    res.header("Access-Control-Allow-Origin", "*");
    res.end("" + version);
});
exports.syncProfile = functions.https.onRequest(async (req, res) => {
    
  res.header("Access-Control-Allow-Origin", "*");
  admin.database().ref('/profile').push(req.body);
  res.end("DATA Written: " + JSON.stringify(req.body));
});
  /*exports.makeUppercase = functions.database.ref('/messages/{pushId}/original')
  .onCreate((snapshot, context) => {
    // Grab the current value of what was written to the Realtime Database.
    const original = snapshot.val();
    console.log('Uppercasing', context.params.pushId, original);
    const uppercase = original.toUpperCase();
    // You must return a Promise when performing asynchronous tasks inside a Functions such as
    // writing to the Firebase Realtime Database.
    // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
    return snapshot.ref.parent.child('uppercase').set(uppercase);
  });  */