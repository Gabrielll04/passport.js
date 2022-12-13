const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const conn = require('./AppDB')
const userTB = require('../model/User')
const validPassword = require('../lib/passwordUtils').validPassword

const customFields = {//password know where to look. This is req.body object
    usernameField: 'uname',
    passwordField: 'pw',  
}

const verifyCallback = (username, password, done) => {//done is a callback
    userTB.findOne({where: {User_name: username}})
        .then((user) => {//this line is a basic promise
            if (!user){ return done(null, false) }//if user is not found, telling passport there is no error (the null) nut theres not a user (false)

            const isValid = validPassword(password, user.hash, user.salt)

            if(isValid){
                return done(null, user)
            }else {
                return done(null, false)
            }
        })
        .catch((err) => {
            done(err)//an errors has heppened
        })
}

const strategy = new LocalStrategy(customFields, verifyCallback)

passport.use(strategy)

passport.serializeUser((user, done) => {//this has to do with the express session and how we put a user into the session
    done(null, user.id)
})

passport.deserializeUser((userId, done) => {
    const id = userId
    userTB.findOne({where: {id: id}})
    .then((user) => {
        done(null, user)
    })
    .catch(err => done(err))
})

// passport.use(new LocalStrategy({
//     function(username, password, callback){
    
//     }
// }))