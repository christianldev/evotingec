const DataTypes = require('sequelize')

module.exports = (sequelize, Sequelize) => {
    return sequelize.define("genre", {
        name: {
            type: DataTypes.STRING,
        }

    })
}