const DataTypes = require('sequelize')

module.exports = (sequelize, Sequelize) => {
    return sequelize.define("council", {
        number: {
            type: DataTypes.INTEGER,
            unique: true,
        },
        gender: {
            type: DataTypes.CHAR,
        },

    })
}