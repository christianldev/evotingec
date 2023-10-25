const db = require('../models')
const Candidate = db.candidate
const op = db.Sequelize.Op
const { v4: uuidv4 } = require('uuid')
const fs = require("fs");
const awsUploadImage = require('../utils/aws-upload-image');
exports.create = async (req, res) => {

    const { fName, lName, electionId, party, file } = req.body

    console.log(req.files.candidateImage[0].filename)
    const { createReadStream, mimetype } = await file;

    const C = {
        electionId: electionId,
        fName: fName,
        lName: lName,
        party: party,
        candidateImage: req.files.candidateImage[0].filename,
        candidateSymbol: req.files.candidateSymbol[0].filename,
    }

    const extension = mimetype.split('/')[1];
    const fileName = `candidate/${uuidv4()}.${extension}`;
    const fileData = createReadStream();

    try {
        const awsImage = await awsUploadImage(fileData, fileName);
        if (!awsImage) {
            res.status(500).send({ message: 'Error al subir la imagen' })
        }

        Candidate.create(C)
            .then(r => res.send(r))
            .catch(err => {
                res.status(500).send({ message: err.message || 'Error al crear el candidato' })
            })
        return res.send({
            status: true,
            urlFile: awsImage,
        })
    } catch (error) {
        res.status(500).send({ message: error.message || 'Error al crear el candidato' })
    }




}

exports.findAll = (req, res) => {
    Candidate.findAll().then(d => {
        res.send(d)
    }).catch(err => res.send(err.message))
}