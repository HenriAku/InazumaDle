const avisform = document.getElementById("form");

// On ne met plus les clés Firebase ici ! Tout passe par Netlify Functions.

async function ajouterAvis(newAvis) {
    try {
        const response = await fetch("https://inazumadle.netlify.app/.netlify/functions/getAvis", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newAvis)
        });

        const data = await response.json();
        if (response.ok) {
            alert("Avis ajouté !");
            avisform.reset();
            AffichageAvis();
        } else {
            console.error("Erreur:", data.error);
        }
    } catch (error) {
        console.error("Erreur lors de l'envoi:", error);
    }
}

// Appel de la fonction au submit du formulaire
avisform.addEventListener("submit", (event) => {
    event.preventDefault();

    const error = document.getElementById("error");
    const pseudo = document.getElementById("pseudo");
    const note   = document.getElementById("note");
    const comm   = document.getElementById("commentaire");

    error.textContent = "";

    if (pseudo.value.length === 0 || comm.value.length === 0) {
        error.textContent = "Veuillez remplir tous les champs !";
        error.classList.add("error");
        return;
    }

    const newAvis = {
        pseudoAvis: pseudo.value,
        noteAvis: note.value,
        commAvis: comm.value,
        date: new Date().toLocaleString("fr-FR", { 
            day: "2-digit", month: "2-digit", year: "numeric", 
            hour: "2-digit", minute: "2-digit" 
        })
    };

    ajouterAvis(newAvis);
});


async function AffichageAvis() {
    const lstAvis = document.getElementById("avis-list");
    lstAvis.textContent = "";

    try {
        const response = await fetch("https://inazumadle.netlify.app/.netlify/functions/getAvis");
        const data = await response.json();

        data.forEach(avis => {
            const { pseudoAvis, date, noteAvis, commAvis } = avis;

            const div = document.createElement("div");
            div.classList.add("avis");

            const formattedDate = new Date(date).toLocaleString("fr-FR", { 
                day: "2-digit", month: "2-digit", year: "numeric", 
                hour: "2-digit", minute: "2-digit" 
            });
            

            div.innerHTML = `<h3>${pseudoAvis} - ${formattedDate}</h3>
                             <p>Note : ${"⭐".repeat(noteAvis)}</p>
                             <p>${commAvis}</p>`;

            lstAvis.prepend(div);
        });

    } catch (error) {
        console.error("Erreur lors du chargement des avis :", error);
    }
}

document.addEventListener("DOMContentLoaded", AffichageAvis);

