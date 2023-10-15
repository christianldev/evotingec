module.exports = app => {
    const user = require('../controllers/user.controller')

    const router = require("express").Router();

    router.post('/', user.create)

    router.get('/', user.findAll)

    router.get('/:uid', user.getUserById)

    router.delete('/:id', user.delete)

    router.post('/verify-recaptcha', user.verifyCapcha)

    app.use('/api/user', router)
}