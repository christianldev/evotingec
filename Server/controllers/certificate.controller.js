const nodemailer = require('nodemailer');

exports.sendCertificate = (req, res) => {

    const { email, startDate, nationalId } = req.body;

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_EMAIL,
            pass: process.env.GMAIL_PASSWORD,
        },
    });


    const mailOptions = {
        from: process.env.GMAIL_EMAIL,
        to: email,
        subject: 'CNE: Certificado de votación',
        html: 'Estimado/a, <br><br>Adjunto a este correo encontrará su certificado de votación.<br><br>Saludos cordiales,<br><br>Consejo Nacional Electoral',
        attachments: [
            {
                filename: `certificado_votacion_${startDate}-${nationalId}.pdf`,
                path: `./uploads/certificado_votacion_${startDate}-${nationalId}.pdf`,
            }
        ]
    }

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Certificado enviado: ' + info.response);
        }
    });

}