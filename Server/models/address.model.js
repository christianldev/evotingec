const DataTypes = require('sequelize')

module.exports = (sequelize, Sequelize) => {
    return sequelize.define("address", {

        addressId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        provinceId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        districtId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        parishId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },


    })
}