const Sequelize = require('sequelize')
const UserDB = new Sequelize('teste0', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = {
    Sequelize,
    UserDB
}