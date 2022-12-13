const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const conn = require('../config/AppDB')

const SequelizeStorage = new SequelizeStore({
    db: conn.UserDB,
    storage: 'sessions'
})

module.exports = SequelizeStorage