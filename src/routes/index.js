const express = require('express')
const passport = require('passport')
const genPassword = require('../lib/passwordUtils').genPassword//in routes you must use genPassword, at the passport.js you use verifyPassword
const UserTB = require('../model/User')
const path = require('path')

const router = express.Router()


router.post('/login', passport.authenticate('local'), (req, res, next) => {})

router.post('/register', (req, res, next) => {

    console.log('password: ' + req.body.password)
    console.log('username: ' + req.body.username)
    console.log('uanme' + req.body.uname)

//     const saltHash = genPassword(req.body.pw)

//     const salt = saltHash.salt
//     const hash = saltHash.hash

//     const newUser = userTB.create({
//         User_Name : req.body.uname,
//         User_Hash: hash,
//         User_Salt: salt
//     }).then(console.log(newUser))
//     .catch(console.log('An error has occured'))
})

router.get('/register', (req, res) => {
    res.sendFile(path.resolve('C:/Users/Aluno/Desktop/excel/FFC-AUTH/pages/registerForm.html'));
})

router.get('/', (req, res) => {

    if(req.session.viewCount){
        req.session.viewCount++
    }else {
        req.session.viewCount = 1
    }

    res.send(`You have visited this website: ${req.session.viewCount} times. <a href="/register">Click hear to register</a>`)
})

module.exports = router