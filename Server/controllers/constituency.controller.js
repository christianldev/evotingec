const db = require('../models')
const Constituency = db.constituency

exports.create = (req, res) => {
    const { name, recinto, direccion, province, canton, parroquia, zona, junta, generoId } = req.body

    const Const = {
        name,
        recinto,
        direccion,
        province,
        canton,
        parroquia,
        zona,
        junta,
        generoId

    }

    console.log(Const)

    if (!name || !recinto || !direccion || !province || !canton || !parroquia || !zona || !junta || !generoId) {
        res.status(400).send({ message: 'Error, faltan datos' })
        return
    }

    Constituency.create(Const)
        .then(r => res.send(
            {
                message: 'Padron creado correctamente',
                data: r
            }
        ))
        .catch(err => {
            res.status(500).send({ message: err.message || 'Error al crear el padron' })
        })
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