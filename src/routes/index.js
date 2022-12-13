const express = require('express')
const passport = require('passport')
const genPassword = require('../lib/passwordUtils')//in routes you must use genPassword, at the passport.js you use verifyPassword
const userTB = require('../model/User')
const path = require('path')

const router = express.Router()


router.post('/login', passport.authenticate('local'), (req, res, next) => {})

router.post('/register', (req, res, next) => {

     const saltHash = genPassword(req.body.pw)

     const salt = saltHash.salt
     const hash = saltHash.genHash

     userTB.create({
         User_name: req.body.uname,
         User_hash: hash,
         User_salt: salt
     }).then(res.redirect('/'))
     .catch((err) => {console.log(err)})
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
