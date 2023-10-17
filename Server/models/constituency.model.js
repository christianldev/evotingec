const DataTypes = require('sequelize')

module.exports = (sequelize, Sequelize) => {
    return sequelize.define("constituency", {
        electionId: {
            type: DataTypes.STRING,
            unique: true
        },
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