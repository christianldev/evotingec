const DataTypes = require('sequelize')
const db = require('../models')

module.exports = (sequelize, Sequelize) => {
    return sequelize.define("election_constituency", {

        electionId: {
            type: DataTypes.STRING,
            References: {
                model: db.elections,
                key: 'electionId'
            }
        },

        constituencyId: {
            type: DataTypes.STRING,
            References: {
                model: db.constituency,
                key: 'constituencyId'
            }
        }

    })
}