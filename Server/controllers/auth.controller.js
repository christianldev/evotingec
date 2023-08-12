const axios = require('axios');


exports.Authenticate = (nationalid, res) => {


    axios.get(`https://srienlinea.sri.gob.ec/movil-servicios/api/v1.0/deudas/porIdentificacion/${nationalid}/?tipoPersona=N`)
        .then(r => {
            // if status is 200, then user is authenticated 
            // and we can create a user in our database
            if (r.status === 200) {

                return res.status(200).json(r.data.contribuyente)
            }
            else {
                return res.status(500).send({ message: 'Credenciales incorrectas' })
            }

        }).catch(err => {
            return res.status(500).send(err.message)
        })
}

