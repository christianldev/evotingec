const DataTypes = require('sequelize')

module.exports = (sequelize, Sequelize) => {
    return sequelize.define("constituency", {
        name: {
            type: DataTypes.STRING,
        },
        recinto: {
            type: DataTypes.STRING,
        },
        direccion: {
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
        junta: {
            type: DataTypes.INTEGER,
        },
        generoid: {
            type: DataTypes.INTEGER,
        },

    })
}