const db = require('../models')
const Election = db.elections
const Constituency = db.constituency
const op = db.Sequelize.Op
const { v4: uuidv4 } = require('uuid')
exports.create = (req, res) => {

    const { description, startDate, endDate } = req.body

    console.log(req.body)

    if (!description || !startDate || !endDate) {
        res.status(400).send({ message: 'Error, faltan datos' })
        return
    }


    // generate unique id for election 
    const electionId = uuidv4()


    const ELECTION = {
        electionId,
        description,
        startDate: startDate,
        endDate: endDate,
        status: false,
        result: false,
        deleteStatus: false
    }

    try {
        Election.create(ELECTION)
            .then(r => res.send(r))
            .catch(err => {
                res.status(500).send({ message: err.message || 'Error al crear la eleccion' })
            })


    }
    catch (err) {
        res.status(500).send({
            message: err
        });
    }

}

exports.findAll = (req, res) => {
    let data = []
    try {
        // get only active elections 
        Election.findAll({ where: { deleteStatus: false } }).then(r => {
            r.forEach(e => {
                data.push(e.dataValues)
            })
            res.send(data)
        })
    }
    catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
}

exports.delete = (req, res) => {
    let electionId = req.params.id

    // logical delete 
    Election.update({ deleteStatus: true }, {
        where: { electionId }
    }).then(r => {
        // console.log(r)
        if (r[0] === 1) {
            res.send({ status: "success", msg: `Eleccion con id ${electionId} eliminada` })
        }
        else {
            res.status(404).send({ status: "failed", msg: `Eleccion con id ${electionId} no encontrada` })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    })
}

exports.update = (req, res) => {
    let { electionId } = req.body

    Election.update(req.body, {
        where: { electionId }
    }).then(r => {
        // console.log(r)
        if (r[0] === 1) {
            res.send({ status: "success", msg: `Eleccion con id ${electionId} actualizada` })
        }
        else {
            res.status(404).send({ status: "failed", msg: `Eleccion con id ${electionId} no encontrada` })
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    })
}

exports.findElectionByEId = (req, res) => {
    let eid = req.params.id


    Election.findOne({ where: { electionId: eid } }).then(r => {
        console.log(r.dataValues)
        let election = r.dataValues
        Constituency.findOne({ where: { electionId: election.electionId } }).then(r => {
            console.log(r)
            election.constituency = r.dataValues
            res.send(election)
        })

    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    })
}