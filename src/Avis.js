// Import des modules Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-firestore.js";

// Configuration Firebase (utilisation des variables d'environnement n'est pas possible sur GitHub Pages)
const firebaseConfig = {
    apiKey: "AIzaSyBNQbBzLC93C0sRZ6QDxKItXwhT2Nw-DmA",
    authDomain: "inazumadle-858d7.firebaseapp.com",
    projectId: "inazumadle-858d7",
    storageBucket: "inazumadle-858d7.firebaseapp.com",
    messagingSenderId: "448835816107",
    appId: "1:448835816107:web:360a015e036307fa6f05ee",
    measurementId: "G-RYX5DLVYWR"
};

// Initialisation Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.addEventListener("DOMContentLoaded", () => {
    const avisform = document.getElementById("form");
    const error = document.getElementById("error");
    const lstAvis = document.getElementById("avis-list");

    avisform.addEventListener("submit", async (event) => {
        event.preventDefault();

        const pseudo = document.getElementById("pseudo").value.trim();
        const note = document.getElementById("note").value;
        const comm = document.getElementById("commentaire").value.trim();

        if (pseudo.length === 0 || comm.length === 0) {
            error.textContent = "Veuillez remplir tous les champs !";
            error.classList.add("error");
            return;
        }

        error.classList.remove("error");

        const newAvis = {
            pseudoAvis: pseudo,
            noteAvis: parseInt(note),
            commAvis: comm,
            date: new Date().toISOString()
        };

        try {
            await addDoc(collection(db, "avis"), newAvis);
            alert("Avis ajouté !");
            avisform.reset();
            AffichageAvis();
        } catch (err) {
            console.error("Erreur :", err);
            error.textContent = "Erreur lors de l'envoi de l'avis.";
            error.classList.add("error");
        }
    });

    async function AffichageAvis() {
        lstAvis.innerHTML = "";

        const q = query(collection(db, "avis"), orderBy("date", "desc"));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            const avis = doc.data();
            const div = document.createElement("div");
            div.classList.add("avis");
            div.innerHTML = `
                <h3>${avis.pseudoAvis} - ${new Date(avis.date).toLocaleDateString()}</h3>
                <p>Note : ${"⭐".repeat(avis.noteAvis)}</p>
                <p>${avis.commAvis}</p>
            `;
            lstAvis.appendChild(div);
        });
    }

    AffichageAvis();
});
