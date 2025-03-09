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
    if (event.httpMethod === "GET") {
        try {
            console.log("📡 Récupération des avis depuis Firestore...");
            const snapshot = await db.collection("avis").orderBy("date", "desc").get();

            const avisList = snapshot.docs.map(doc => doc.data());

            console.log("✅ Avis récupérés :", avisList);

            return {
                statusCode: 200,
                body: JSON.stringify(avisList)
            };

        } catch (error) {
            console.error("🔥 Erreur lors de la récupération des avis :", error);
            return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
        }
    }

    if (event.httpMethod === "POST") {
        try {
            console.log("✏️ Ajout d'un nouvel avis...");
            const newAvis = JSON.parse(event.body);

            // Ajoute l'avis dans Firestore
            await db.collection("avis").add({
                pseudoAvis: newAvis.pseudoAvis,
                noteAvis: newAvis.noteAvis,
                commAvis: newAvis.commAvis,
                date: new Date().toISOString()
            });

            console.log("✅ Avis ajouté !");
            return { statusCode: 200, body: JSON.stringify({ message: "Avis ajouté !" }) };

        } catch (error) {
            console.error("🔥 Erreur lors de l'ajout de l'avis :", error);
            return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
        }
    }

    return { statusCode: 405, body: JSON.stringify({ error: "Méthode non autorisée" }) };
};
