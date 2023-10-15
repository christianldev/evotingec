const db = require('../models')
const ConstituencyCouncil = db.constituency_council
const Constituency = db.constituency
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
    Constituency.findAll().then(d => {
        res.send(d)
    }).catch(err => {
        res.send(err.message)
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