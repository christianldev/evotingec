const axios = require('axios');
const { create } = require('./user.controller');


exports.Authenticate = (req, res) => {


    const { nationalid } = req.headers
    axios.get(`https://srienlinea.sri.gob.ec/movil-servicios/api/v1.0/deudas/porIdentificacion/${nationalid}/?tipoPersona=N`)
        .then(r => {
            // if status is 200, then user is authenticated 
            // and we can create a user in our database
            if (r.status === 200) {
                res.status(200).send(r.data)
                create(r.data)
            }
            else {
                res.status(500).send({ message: 'Credenciales incorrectas' })
            }

        }).catch(err => {
            res.status(500).send(err.message)
        })
}

