const db = require('../models')
const Genre = db.genre

exports.findAll = (req, res) => {
    let data = []
    Genre.findAll().then(d => {
        if (d.length === 0) {
            res.send(data)
        }
        else {
            data = d
            res.send(data)
        }
    }).catch(err => res.send(err.message))
}
