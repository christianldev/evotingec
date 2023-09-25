const DataTypes = require('sequelize')

module.exports = (sequelize, Sequelize) => {
    return sequelize.define("constituency", {
        name: {
            type: DataTypes.STRING,
        },
        province: {
            type: DataTypes.STRING,
        },
        canton: {
            type: DataTypes.STRING,
        },
        parroquia: {
            type: DataTypes.STRING,
        },
        zona: {
            type: DataTypes.STRING,
        },
        junta: {
            type: DataTypes.INTEGER,
        },
        numeroCertificado: {
            type: DataTypes.INTEGER, unique: true
        },
        generoid: {
            type: DataTypes.INTEGER,
        },

    })
}