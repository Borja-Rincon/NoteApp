module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "Borja.1991",
    DB: "db_notes",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};