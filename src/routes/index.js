const express = require('express')
const passport = require('passport')
const utils = require('../lib/passwordUtils')//in routes you must use genPassword, at the passport.js you use verifyPassword
const userTB = require('../model/User')
const path = require('path')

const router = express.Router()


router.post('/login', passport.authenticate('local', {failureRedirect: '/failureLogin', successRedirect: '/homepage'}))

router.get('/failureLogin', (req, res) => {res.send(404)})

router.get('/login', (req, res) => {
    res.sendFile(path.resolve('C:/Users/Aluno/Desktop/excel/FFC-AUTH/pages/loginForm.html'))
})

router.post('/register', (req, res, next) => {

     const saltHash = utils.genPassword(req.body.pw)

     const salt = saltHash.salt
     const hash = saltHash.genHash

     userTB.create({
         User_name: req.body.uname,
         User_hash: hash,
         User_salt: salt
     }).then(res.redirect('/'))
     .catch((err) => {console.log(err)})
})

router.get('/homepage', (req, res) => {
    
    if(req.session.viewCount){
        req.session.viewCount++
    }else {
        req.session.viewCount = 1
    }

    res.send(`Você se logou. Bem vindo, ${req.user.User_name}. You have visited this website: ${req.session.viewCount} times. `)//In this form we get the user data
})

router.get('/register', (req, res) => {
    res.sendFile(path.resolve('C:/Users/Aluno/Desktop/excel/FFC-AUTH/pages/registerForm.html'))
})

router.get('/', (req, res) => {
    res.send(`<a href="/register">Click hear to register</a> and <a href="/login">hear to login</a>`)
})

module.exports = router
