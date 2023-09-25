const DataTypes = require('sequelize')

module.exports = (sequelize, Sequelize) => {
    return sequelize.define("genre", {
        genreId: {
            type: DataTypes.INTEGER,
        },
        name: {
            type: DataTypes.STRING,
        }

    })
}