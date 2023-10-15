const DataTypes = require('sequelize')

module.exports = (sequelize, Sequelize) => {
    return sequelize.define("district", {
        name: {
            type: DataTypes.STRING,
        }

    })
}