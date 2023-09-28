module.exports = app => {
    const genre = require('../controllers/genre.controller')

    const router = require("express").Router();

    // router.post('/', election.create)

    router.get('/', genre.findAll)

    app.use('/api/genre', router)
}