const { sendCertificate } = require("../controllers/certificate.controller");
module.exports = app => {

    const router = require("express").Router();

    router.post("/sendCertificate", sendCertificate)

    app.use('/api', router)
}