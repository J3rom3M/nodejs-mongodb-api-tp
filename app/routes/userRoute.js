// const express = require('express')
// const router = express.Router()
// const userCtrl = require('../controllers/login')
//
// router.post('api/signup', userCtrl.signup)
// router.post('api/login', userCtrl.login)
//
// module.exports = router

const Signup = require('../controllers/signup.js')


module.exports = {
    api: {
        Signup
    }
}
