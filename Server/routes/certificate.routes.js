const { sendCertificate, createPdf, fetchPdf } = require("../controllers/certificate.controller");

module.exports = app => {

    const router = require("express").Router();

    router.post("/createPdf", createPdf)

    router.get("/fetchPdf", fetchPdf)

    router.post("/sendCertificate", sendCertificate)

    app.use('/api', router)
}