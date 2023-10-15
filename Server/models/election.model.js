DataTypes = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    return sequelize.define("election", {
        decription: {
            type: DataTypes.STRING,
        },
        startDate: {
            type: DataTypes.DATE,
        }, endDate: {
            type: DataTypes.DATE,
        }, status: {
            type: DataTypes.BOOLEAN,
        }, result: {
            type: DataTypes.BOOLEAN,
        }
    });
};
