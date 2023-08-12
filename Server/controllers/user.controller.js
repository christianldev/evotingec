const { randomInt } = require('crypto')
const db = require('../models')
const User = db.user
const op = db.Sequelize.Op
const { v4: uuidv4 } = require('uuid')


exports.create = (login) => {
    const { contribuyente } = login
    const { nombreComercial, identificacion, tipoIdentificacion } = contribuyente
    // generar random number para constituencyId 

    const constituencyId = randomInt(10000000, 99999999)

    const USER = {
        userId: uuidv4(),
        constituencyId: 1,
        fName: nombreComercial,
        nationalId: identificacion,
        email: "user@test.com"
    }



    // IF USER EXISTS RETURN USER ELSE CREATE USER 

    if (USER) {
        return USER
    }
    else {
        return User.create(USER)
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