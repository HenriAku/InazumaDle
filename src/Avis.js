const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialiser Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();

const avisform = document.getElementById("form");

avisform.addEventListener("submit", (event) => {
	event.preventDefault();

	const error = document.getElementById("error");
	const pseudo = document.getElementById("pseudo");
	const note   = document.getElementById("note");
	const comm   = document.getElementById("commentaire");

	if(pseudo.value.lenght === 0 || comm.value.lenght === 0)
	{
		error.textContent = "Veuillez remplir tous les champs !";
		error.classList.add("error");
	}

	const newAvis = {
		pseudoAvis : pseudo.value,
		noteAvis : note.value,
		commAvis : comm.value,
		date: new Date().toLocaleDateString()
	};


	//ajout avis Firebase
    db.collection("avis").add(newAvis)
        .then(() => {
            alert("Avis ajouté !");
            avisform.reset();
            AffichageAvis();
        })
        .catch(error => console.error("Erreur :", error));

	error.classList.remove("error");

});

function AffichageAvis()
{
	const lstAvis = document.getElementById("avis-list");
	lstAvis.textContent = "";

	db.collection("avis").orderBy("date", "desc").get().then((querySnapshot) => {
		querySnapshot.forEach((doc) => {
			const avis = doc.data();
			const pseudo = avis.pseudoAvis;
			const date = avis.date;
			const note = avis.noteAvis;
			const comm = avis.commAvis;

			const div = document.createElement("div");
			div.classList.add("avis");

			div.innerHTML = `<h3>${pseudo} - ${date}</h3>
			<p>Note : ${"⭐".repeat(note)}</p>
			<p>${comm}</p>`;

			lstAvis.prepend(div);
		});
	});
}

document.addEventListener("DOMContentLoaded", AffichageAvis);
