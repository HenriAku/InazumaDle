const form  = document.getElementById("form" );

document.getElementById("form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const emailInput = document.getElementById("mail");
    const subjectInput = document.getElementById("objet");
    const messageInput = document.getElementById("msg");
    const error = document.getElementById("error");

    error.classList.remove("error");

    // Vérification des champs vides
    if (!emailInput.value || !subjectInput.value || !messageInput.value) {
        error.textContent = "Veuillez remplir tous les champs.";
        error.classList.add("error");
        return;
    }

    // Vérification d'un email valide
    if (!emailInput.value.includes("@") || !emailInput.value.includes(".")) {
        error.textContent = "Veuillez entrer un email valide.";
        error.classList.add("error");
        return;
    }

    // Création de l'objet à envoyer
    const emailData = {
        email: emailInput.value,
        subject: subjectInput.value,
        message: messageInput.value
    };

    try {
        const response = await fetch("/.netlify/functions/email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(emailData)
        });

        const result = await response.json();

        if (response.ok) {
            alert("Message envoyé avec succès !");
            emailInput.value = "";
            subjectInput.value = "";
            messageInput.value = "";
        } else {
            throw new Error(result.error || "Erreur lors de l'envoi");
        }
    } catch (err) {
        console.error("Erreur :", err);
        error.textContent = err.message;
        error.classList.add("error");
    }
});

