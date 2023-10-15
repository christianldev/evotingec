module.exports = {
  HOST: "localhost",
  USER: "clopez",
  PASSWORD: "holamundo",
  DB: "evoting_relational",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};