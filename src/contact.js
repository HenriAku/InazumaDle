emailjs.init(import.meta.env.EMAILJS_PUBLIC_KEY);

const form  = document.getElementById("form" );

form.addEventListener("submit", (event) => {
    event.preventDefault(); 

    const email = document.getElementById("mail" );
    const objet = document.getElementById("objet");
    const msg   = document.getElementById("msg"  );
    const error = document.getElementById("error");

    error.classList.remove("error");

    if (email.value.length === 0 || objet.value.length === 0 || msg.value.length === 0) 
		{
        error.textContent = "Veuillez remplir tous les champs.";
        error.classList.add("error");
        return;
    }

    if (!email.value.includes("@") || !email.value.includes(".")) 
		{
        error.textContent = "Veuillez entrer un email valide.";
        error.classList.add("error");
        return;
    }

	const templateParams = {
        from_email: email.value,
        subject: objet.value,
        message: msg.value
    };

    error.classList.remove("error");
    error.textContent = "";

    emailjs.send("service_oe15exr", "template_cgp80kk", templateParams)
        .then(
            (response) => {
                alert("Message envoyé avec succès !");
                form.reset();
            },
            (error) => {
                error.classList.add("error");
                error.textContent = "Erreur lors de l'envoi du message.";
            }
        );
});
