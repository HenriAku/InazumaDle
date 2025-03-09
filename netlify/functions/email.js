const nodemailer = require("nodemailer");

exports.handler = async function (event) {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Méthode non autorisée" };
    }

    try {
        const { email, subject, message } = JSON.parse(event.body);

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER, 
                pass: process.env.EMAIL_PASS  
            }
        });

        // Contenu de l'email
        const mailOptions = {
            from: email,
            to: process.env.EMAIL_USER, 
            subject: subject,
            text: message
        };

        // Envoi du mail
        await transporter.sendMail(mailOptions);

        return { statusCode: 200, body: JSON.stringify({ message: "Email envoyé avec succès !" }) };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};
