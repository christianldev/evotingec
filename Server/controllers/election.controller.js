const db = require('../models')
const Election = db.elections
const Constituency = db.constituency
const op = db.Sequelize.Op
const { v4: uuidv4 } = require('uuid')
exports.create = (req, res) => {

    const { description, startDate, endDate } = req.body

    // generate unique id for election 
    const electionId = uuidv4()


    const ELECTION = {
        electionId,
        description,
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
    Election.findAll().then(d => {
        if (d.length === 0) {
            res.send(data)
        }
        else {
            d.forEach((e, i) => {
                // console.log(e.dataValues)
                let _e = e.dataValues

                Constituency.findOne({ electionId: e.electionId }).then(c => {
                    _e.constituency = c.dataValues
                    // console.log(_e)
                    data.push(_e)
                    if (data.length === d.length) res.send(data)
                })
            })
        }
    }).catch(err => res.send(err.message))
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