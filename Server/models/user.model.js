DataTypes = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    return sequelize.define("user", {
        userId: {
            type: DataTypes.STRING, unique: true
        }, fName: {
            type: DataTypes.STRING,
        }, nationalId: {
            type: DataTypes.STRING, unique: true
        }, email: {
            type: DataTypes.STRING, unique: true
        },
        birthDate: {
            type: DataTypes.DATE,
        },
        constituencyId: {
            type: DataTypes.INTEGER,
        },
    });
};
