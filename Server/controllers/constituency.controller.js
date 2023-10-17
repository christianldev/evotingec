const db = require('../models')
const ConstituencyCouncil = db.constituency_council
const Constituency = db.constituency
const Address = db.address
const Council = db.council
const { v4: uuidv4 } = require('uuid')

exports.create = async (req, res) => {
    const { electionId, enclosure, addressId, circunscriptionId, councilId } = req.body

    if (!electionId || !enclosure || !addressId || !circunscriptionId) {
        res.status(400).send({ message: 'Error, faltan datos' })
        return
    }

    //verify that election has status true 
    const election = await db.elections.findOne({ where: { electionId } })
    if (!election) {
        res.status(400).send({ message: 'Error, la eleccion no existe' })
        return
    }
    if (!election.dataValues.status) {
        res.status(400).send({ message: 'Error, la eleccion no esta activa' })
        return
    }


    const CONSTITUENCY = {
        electionId,
        enclosure,
        addressId,
        circunscriptionId,
        constituencyId: uuidv4()
    }



    try {
        const verifyIfExist = await Constituency.findOne({ where: { electionId } })
        if (verifyIfExist) {
            res.status(400).send({ message: 'Error, el padron ya existe' })
            return
        }

        const constituency = await Constituency.create(CONSTITUENCY)
        console.log(constituency)

        if (councilId) {
            const constituencyCouncil = await ConstituencyCouncil.create({ constituencyId: constituency.id, councilId })
        }
        res.status(200).send({ message: 'Padron creado correctamente' })

    } catch (error) {
        res.status(500).send({ message: error.message || 'Error al crear la eleccion' })
    }



}




exports.findAll = (req, res) => {
    // join with address and join with provinces, districts, parishes and council table
    const constituency = db.sequelize.query(`SELECT constituencies.id ,constituencies.enclosure, constituencies.circunscriptionId, addresses.address, provinces.name AS province,
        districts.name AS district, parishes.name AS parish, councils.number AS council, councils.gender AS councilGender
       FROM constituencies INNER JOIN addresses ON constituencies.addressId = addresses.addressId
    INNER JOIN constituency_councils ON constituencies.id = constituency_councils.constituencyId
    INNER JOIN councils ON constituency_councils.councilId = councils.id INNER JOIN parishes
        ON addresses.parishId = parishes.id INNER JOIN districts ON addresses.districtId = districts.id
    INNER JOIN provinces ON addresses.provinceId = provinces.id`, { type: db.sequelize.QueryTypes.SELECT })
        .then(data => {

            res.send(data)
        })
        .catch(err => {
            res.status(500).send({ message: err.message || 'Error al recuperar los datos' })
        })



}

exports.delete = (req, res) => {
    const id = req.params.id
    Constituency.destroy({
        where: { id: id }
    }).then(num => {
        if (num) {
            res.status(200).send({ "status": "success" })
        } else {
            res.status(404).send({ "status": `not found constituency with id:id=${id}` })
        }
    }).catch(err => {
        res.send(500).send({ "error": err.message, "status": `failed deleting constituency with id: ${id}` })
    })
}