const nodemailer = require('nodemailer');

exports.sendMail = async (req, res) => {

    const { email } = req.body;

    if (email === '') {
        res.status(400).json({ message: 'Email es requerido' });
    }

    try {

        const verificationCode = Math.floor(100000 + Math.random() * 900000);

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
            subject: 'Verifica tu correo electronico',
            html: `Por favor ingrese el siguiente codigo para verificar su correo electronico: <b>${verificationCode}</b>`,
        };

        // Send the verification email
        const response = await transporter.sendMail(mailOptions, (error, info) => {

            if (error) {

                res.status(500).send('Failed to send verification email.');
            } else {

                req.session.email = email;
                req.session.verificationCode = verificationCode;
                console.log(req.session.verificationCode)
                res.status(200).send('Verification email sent successfully!');
            }
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Fallo al enviar el correo de verificacion.');
    }
}

exports.verifyOTP = (req, res) => {
    const { otp } = req.body
    console.log(req.session)
    console.log(otp, req.session.verificationCode)
    if (otp === req.session.verificationCode) {
        res.status(200).send({ status: true, msg: 'Email verification successful!' });
    } else {
        res.status(404).send({ status: false, msg: 'Email verification failed!' });
    }
}