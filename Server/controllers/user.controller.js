

const db = require('../models')
const User = db.user
const op = db.Sequelize.Op
const { v4: uuidv4 } = require('uuid')

const axios = require('axios');


exports.create = async (req, res) => {

    const { userId, email, constituencyId, birthDate, nationalId, password } = req.body



    try {

        if (!userId || !email || !birthDate || !constituencyId || !nationalId || !password) {
            return res.status(400).send({ message: 'Faltan datos' })

        }

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