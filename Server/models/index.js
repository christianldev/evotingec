const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;



db.elections = require("./election.model.js")(sequelize, Sequelize);
db.constituency = require('./constituency.model')(sequelize, Sequelize)
db.constituency_council = require('./constituency_council.model')(sequelize, Sequelize)
db.candidate = require('./candidate.model')(sequelize, Sequelize)
db.user = require('./user.model')(sequelize, Sequelize)
db.council = require('./council.model')(sequelize, Sequelize)
db.address = require('./address.model')(sequelize, Sequelize)
db.province = require('./province.model')(sequelize, Sequelize)
db.district = require('./district.model')(sequelize, Sequelize)
db.parish = require('./parish.model')(sequelize, Sequelize)

/* ------------------------------------------------ */
/* -------------- Election Relationship -------------- */
db.elections.hasMany(db.constituency, { foreignKey: 'electionId', as: 'constituencies' })
db.constituency.belongsTo(db.elections, { foreignKey: 'electionId', as: 'election' })

/* ------------------------------------------------ */
/* -------------- User Relationship -------------- */
db.user.belongsTo(db.constituency, { foreignKey: 'constituencyId', as: 'constituency' })
db.constituency.hasMany(db.user, { foreignKey: 'constituencyId', as: 'users' })


/* ------------------------------------------------ */
/* -------------- Address Relationship -------------- */
db.constituency.belongsTo(db.address, { foreignKey: 'addressId', as: 'address' })
db.address.hasMany(db.constituency, { foreignKey: 'addressId', as: 'constituencies' })
db.address.belongsTo(db.province, { foreignKey: 'provinceId', as: 'province' })
db.province.hasMany(db.address, { foreignKey: 'provinceId', as: 'addresses' })
db.address.belongsTo(db.district, { foreignKey: 'districtId', as: 'district' })
db.district.hasMany(db.address, { foreignKey: 'districtId', as: 'addresses' })
db.address.belongsTo(db.parish, { foreignKey: 'parishId', as: 'parish' })
db.parish.hasMany(db.address, { foreignKey: 'parishId', as: 'addresses' })

/* ------------------------------------------------ */
/* -------------- council Relationship -------------- */

db.constituency.belongsToMany(db.council, { through: db.constituency_council, foreignKey: 'constituencyId', as: 'councils' })
db.council.belongsToMany(db.constituency, { through: db.constituency_council, foreignKey: 'councilId', as: 'constituencies' })



module.exports = db;
