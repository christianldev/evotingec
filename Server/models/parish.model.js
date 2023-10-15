const DataTypes = require('sequelize')

module.exports = (sequelize, Sequelize) => {
    return sequelize.define("parish", {
        name: {
            type: DataTypes.STRING,
        }
    })
}