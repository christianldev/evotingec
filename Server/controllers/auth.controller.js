const axios = require('axios');

exports.Authenticate = (req, res) => {
    const { nationalId } = req.body

    axios.get(`https://srienlinea.sri.gob.ec/movil-servicios/api/v1.0/deudas/porIdentificacion/${nationalId}/?tipoPersona=N`)
        .then(r => {
            // if status is 200, then user is authenticated 
            // and we can create a user in our database
            if (r.status === 200) {
                console.log(r.data)
                res.status(200).send(r.data)
            }
            else {
                res.status(500).send({ message: 'Credenciales incorrectas' })
            }

        }).catch(err => {
            res.status(500).send(err.message)
        })
}

