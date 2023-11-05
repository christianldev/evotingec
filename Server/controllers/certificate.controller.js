const nodemailer = require('nodemailer');
const pdf = require('html-pdf')
const path = require('path')
const fs = require('fs')
const pdfTemplate = require("../documents/document");
const env = require('dotenv')
env.config()

exports.createPdf = (req, res) => {

    console.log(req.body)

    pdf.create(pdfTemplate(req), {}).toFile(`./uploads/certificado_votacion_${req.body.startDate}-${req.body.nationalId}.pdf`, (err) => {
        if (err) {
            console.log(err);
        }
        res.send('pdf generated')
    })
}

exports.fetchPdf = (req, res) => {
    res.sendFile(path.join(__dirname, `../uploads/certificado_votacion_${req.body.startDate}-${req.body.nationalId}.pdf`))
}

exports.sendCertificate = (req, res) => {

    pathToAttachment = path.join(__dirname, `../uploads/certificado_votacion_${req.body.startDate}-${req.body.nationalId}.pdf`)
    attachment = fs.readFileSync(pathToAttachment).toString("base64")


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
        tls: { rejectUnauthorized: false }
    });


    const mailOptions = {
        from: process.env.GMAIL_EMAIL,
        to: email,
        subject: 'CNE: Certificado de votación',
        html: 'Estimado/a, <br><br>Adjunto a este correo encontrará su certificado de votación.<br><br>Saludos cordiales,<br><br>Consejo Nacional Electoral',
        attachments: [
            {
                content: attachment,
                filename: `certificado_votacion_${startDate}-${nationalId}.pdf`,
                contentType: 'application/pdf',
                path: pathToAttachment
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