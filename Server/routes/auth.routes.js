module.exports = app => {
    const auth = require('../controllers/auth.controller')

    const router = require("express").Router();

    router.get('/', auth.Authenticate)

    app.use('/api/auth', router)
}