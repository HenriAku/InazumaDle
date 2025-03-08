emailjs.init("ZfCbz8CCoCQtPFB4m");

const form  = document.getElementById("form" );

form.addEventListener("submit", (event) => {
    event.preventDefault(); 

    const email = document.getElementById("mail" );
    const objet = document.getElementById("objet");
    const msg   = document.getElementById("msg"  );
    const error = document.getElementById("error");


    if (email.value.length === 0 || objet.value.length === 0 || msg.value.length === 0) 
		{
        error.textContent = "Veuillez remplir tous les champs.";
        return;
    }

    if (!email.value.includes("@") || !email.value.includes(".")) 
		{
        error.textContent = "Veuillez entrer un email valide.";
        return;
    }

	const templateParams = {
        from_email: email.value,
        subject: objet.value,
        message: msg.value
    };

    emailjs.send("service_oe15exr", "template_cgp80kk", templateParams)
        .then(
            (response) => {
                console.log('SUCCESS!', response.status, response.text);
                alert("Message envoyé avec succès !");
                form.reset();
            },
            (error) => {
                console.error('FAILED...', error);
                error.textContent = "Erreur lors de l'envoi du message.";
            }
        );
});
