const DataTypes = require('sequelize')
const db = require('../models')

module.exports = (sequelize, Sequelize) => {
    return sequelize.define("constituency_council", {
        constituencyId: {
            type: DataTypes.INTEGER,
            references: {
                model: db.constituency,
                key: 'constituencyId'
            }
        },
        councilId: {
            type: DataTypes.INTEGER,
            references: {
                model: db.council,
                key: 'id'
            }
        }


    })
}