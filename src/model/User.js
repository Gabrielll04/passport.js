const conn = require('../config/AppDB')

const userTB = conn.UserDB.define('users', {
    User_name: {
        type: conn.Sequelize.STRING
    },
    User_hash: {
        type: conn.Sequelize.STRING
    },
    User_salt: {
        type: conn.Sequelize.STRING
    }
})

// TB_User.sync({forced: true})

module.exports = userTB