const DataTypes = require('sequelize')

module.exports = (sequelize, Sequelize) => {
    return sequelize.define("constituency", {



        enclosure: {
            type: DataTypes.STRING,
        },
        addressId: {
            type: DataTypes.INTEGER,
        },
        circunscriptionId: {
            type: DataTypes.INTEGER,
        }
    })
}