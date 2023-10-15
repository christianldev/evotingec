const db = require('../models')
const Election = db.elections
const Constituency = db.constituency
const op = db.Sequelize.Op
const { v4: uuidv4 } = require('uuid')
exports.create = (req, res) => {

    const { startDate, endDate } = req.body

    console.log(req.body)

    const ELECTION = {
        electionId: uuidv4(),
        startDate: startDate,
        endDate: endDate,
        status: false,
        result: false
    }

    Election.create(ELECTION)
        .then(r => res.send(r))
        .catch(err => {
            res.status(500).send({ message: err.message || 'Error al crear la eleccion' })
        })

}

exports.findAll = (req, res) => {
    let data = []
    try {
        Election.findAll().then(r => {
            r.forEach(e => {

                let election = e.dataValues

                Constituency.findOne({ where: { electionId: election.electionId } })
                    .then(r => {

                        election.constituency = r.dataValues
                        data.push(election)
                    })
            })
            res.send(data)
        }).catch(err => {
            res.status(500).send({
                message: err.message
            });
        })
    } catch (error) {
        console.log(error)
    }
}

exports.delete = (req, res) => {
    let id = req.params.id
    Election.destroy({ where: { id: id } }).then(r => {
        if (r) {
            res.status(200).send({ "status": "success", "msg": `Eleccion con id ${id} eliminada` })
        }
        else {
            res.status(404).send({ "status": "success", "msg": `Eleccion con id ${id} no encontrada` })
        }
    }).catch(err => {
        res.send({ "status": "failed", "msg": "Fallo al eliminar eleccion" })
    })
}

exports.update = (req, res) => {
    let id = req.body.id
    Election.update(req.body, {
        where: { id: id }
    }).then(r => {
        console.log(r)
        if (r[0] === 1) {
            res.send({ status: "success", msg: `Eleccion con id ${id} actualizada` })
        }
        else {
            res.status(404).send({ status: "failed", msg: `Eleccion con id ${id} no encontrada` })
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
        let election = r.dataValues
        Constituency.findByPk(election.constituencyId).then(r => {
            election.constituency = r.dataValues
            res.send(election)
        })

    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    })
}