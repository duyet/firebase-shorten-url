const axios = require('axios');

// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
const app = admin.initializeApp();
const db = admin.firestore()
db.settings({ timestampsInSnapshots: true })

const config = functions.config().config
const apiKey = process.env.API_KEY || config.api_key || app.options_.apiKey
const firebaseDynamicLinkApi = `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${apiKey}`;
const domainUriPrefix = config.domain_uri_prefix || 'https://duyeturl.page.link'; // TODO: move this `domainUriPrefix` to config
const URL_COLLECTION = config.url_collection || 'urls';

exports.addUrl = functions.https.onRequest(async (req, res) => {
    const link = req.query.url || req.body.url || null;
    console.log(JSON.stringify(req.headers, null, 4))

    try {
        console.log(`Getting shorten URL for: ${link}`);
        let result = await axios.post(firebaseDynamicLinkApi, {
            dynamicLinkInfo: {
                domainUriPrefix,
                link,
            },
            suffix: {
                option: 'SHORT'
            }
        })

        // Store the result to Firestore
        try {
            const data = Object.assign(result.data, {
                clientInformation: req.headers,
                originalUrl: link,
                created: new Date()
            })
            const shortenKey = data.shortLink.split('/').slice(-1).pop()
            const docRef = await db.collection(URL_COLLECTION).doc(shortenKey).set(data);
            console.log("Document written with ID: ", docRef.id);
        } catch (error) {
            console.error("Error adding document: ", error);
        }

        res.json(result.data);
    } catch (e) {
        console.error(e.message);
        res.status(500).json('error');
    }
});


exports.analytics = functions.https.onRequest(async (req, res) => {
    const shortDynamicLink = req.query.shortLink || req.body.shortLink || null;
    const durationDays = req.query.durationDays || req.body.durationDays || 30;
    const requestUrl = `https://firebasedynamiclinks.googleapis.com/v1/${shortDynamicLink}/linkStats?durationDays=${durationDays}&key=${apiKey}`;

    try {
        console.log(`Getting statistics for: ${shortDynamicLink}`);
        let result = await axios.get(requestUrl)
        res.json(result.data);
    } catch (e) {
        console.error(e.message);
        res.status(500).json('error');
    }
})