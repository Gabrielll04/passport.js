const express = require('express')
const pages = require('./src/routes')
const session = require('express-session')
const sessionStorage = require('./src/model/Session')
const passport = require('passport')

require('dotenv').config()
const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStorage.SequelizeStorage,
    cookie: {
        maxAge: 1024 * 60 * 60 * 24
    } 
}))

//passport authentication
require('./src/config/passport')

app.use(passport.initialize())//initializing passport middleware
app.use(passport.session())//has to do a little bit with serialize and deserialize
//the express session gives us access to the request.session object and anything that we store on the request.json object inside any of the routes is going to be persisted to the database under the sessions collection

app.use((req, res, next) => {
    console.log(req.session)
    console.log(req.user)
})

//routes
app.use(pages)

const PORT = process.env.PORT || 8080
app.listen(8080, () => { console.log(`Listening server at port ${PORT}`) })
