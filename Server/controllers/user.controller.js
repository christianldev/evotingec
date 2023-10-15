

const db = require('../models')
const User = db.user
const op = db.Sequelize.Op
const { v4: uuidv4 } = require('uuid')
const ConstituencyGenre = db.constituency_genre
const ConstituencyCouncil = db.constituency_council
const Constituency = db.constituency
const axios = require('axios');
const requestIP = require('request-ip');


exports.create = async (req, res) => {

    const { userId, email, birthDate, nationalId, password, reCAPTCHA_TOKEN } = req.body
    // obtain ip of user 
    const ip = requestIP.getClientIp(req);


    if (!userId || !email || !birthDate || !nationalId || !password || !ip || !reCAPTCHA_TOKEN) {
        return res.status(400).send({ message: 'Faltan datos' })

    }

    try {



        const getPadron = await this.GetPadron(res, nationalId, ip, birthDate, reCAPTCHA_TOKEN)

        console.log("getPadron", getPadron)



        const response = await axios.get(`https://srienlinea.sri.gob.ec/movil-servicios/api/v1.0/deudas/porIdentificacion/${nationalId}/?tipoPersona=N`)

        if (response.status !== 200) {
            return res.status(500).send({ message: 'Cedula incorrecta' })
        }




        else if (response.status === 200) {


            const { nombreComercial } = response.data.contribuyente

            const USER = {
                userId: userId,
                constituencyId: constituencyId,
                fName: nombreComercial,
                nationalId: nationalId,
                email: email,
                birthDate: birthDate,
            }

            // search if email and nationalId exists in database 
            const user = await User.findOne({ where: { [op.or]: [{ email: email.toLowerCase() }, { nationalId }] } })
            if (user) {

                return res.status(400).send({
                    message: 'El usuario ya existe',

                })

            }

            // create user
            const newUser = await User.create(USER)
            return res.status(200).send(newUser)

        }

    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: error.response?.data.mensaje })

    }
}

exports.GetPadron = async (res, nationalId, ip, nombre, reCAPTCHA_TOKEN) => {


    try {



        const response = await axios.post(`https://lugarvotacion.cne.gob.ec/CneApiWs/api/ConsultaVotacionDomicilioElectoral2021`, {
            cedula: nationalId,
            ip: ip,
            nombre: birthDate,
            recaptcharesponse: reCAPTCHA_TOKEN
        })

        if (response.status !== 200) {
            return res.status(500).send({ message: 'Datos incorrectos' })
        }

        else if (response.status === 200) {

            Constituency.create({
                constituencyId: uuidv4(),
                addressId: response.data.direccion.id,
                enclosure: response.data.direccion.recinto,
                circunscriptionId: response.data.direccion.circunscripcion
            })



        }

    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: error.response?.data.mensaje })

    }
}


exports.findAll = (req, res) => {
    User.findAll().then(d => {
        res.send(d)
    }).catch(err => res.send(err.message))
}

exports.getUserById = (req, res) => {
    let uId = req.params.uid
    User.findOne({ where: { userId: uId } }).then(r => {
        res.send(r)
    }).catch(err => {
        res.status(500).send({ "msg": err.message })
    })
}

exports.delete = (req, res) => {
    let id = req.params.id
    User.destroy({ where: { id: id } }).then(r => {
        res.status(200).send(r)
    }).catch(err => {
        res.status(500).send(err.message)
    })
}

exports.verifyCapcha = async (req, res) => {

    const { reCAPTCHA_TOKEN, Secret_Key } = req.body



    if (!reCAPTCHA_TOKEN) {
        return res.status(400).json({
            success: false,
            message: "Token no encontrado"
        });
    }

    try {
        let response = await axios.post(`https://www.google.com/recaptcha/api/siteverify?secret=${Secret_Key}&response=${reCAPTCHA_TOKEN}`);


        return res.status(200).json({
            success: true,
            message: "Token successfully verified",
            verification_info: response.data
        });

    }
    catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Error verifying token"
        })
    }
}