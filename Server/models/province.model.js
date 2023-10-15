const DataTypes = require('sequelize')

module.exports = (sequelize, Sequelize) => {
    return sequelize.define("province", {
        name: {
            type: DataTypes.STRING,
            unique: true,
        }

    })
}