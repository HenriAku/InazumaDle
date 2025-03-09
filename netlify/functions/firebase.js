const admin = require("firebase-admin");

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert({
            "type": "service_account",
            "project_id": process.env.FIREBASE_PROJECT_ID,
            "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
            "client_email": process.env.FIREBASE_CLIENT_EMAIL
        }),
        databaseURL: process.env.FIREBASE_DB_URL
    });
}

const db = admin.firestore();

exports.handler = async function(event, context) {
    if (event.httpMethod === "POST") {
        try {
            const data = JSON.parse(event.body);
            await db.collection("avis").add(data);
            return { statusCode: 200, body: JSON.stringify({ message: "Avis ajouté !" }) };
        } catch (error) {
            return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
        }
    }

    return { statusCode: 405, body: "Méthode non autorisée" };
};
