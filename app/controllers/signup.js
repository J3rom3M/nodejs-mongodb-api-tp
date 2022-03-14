const bcrypt = require('bcrypt')
const User = require('../models/user')
const {hash} = require("bcrypt");
const UserModel = require('../../models/user.js')

class Signup {
    /**
     * @constructor
     * @param {Object} app
     * @param {Object} config
     */
    constructor (app, connect, config) {
        this.app = app
        this.UserModel = connect.model('User', UserModel)

        this.run()
    }

    /**
     * Middleware
     */
    middleware () {
        this.app.post('/api/signup/', (req, res) => {
            try {
                const userModel = new this.UserModel(req.body)
                bcrypt.hash(userModel.body.password, 10)
                    .then(hash => {
                        userModel({
                            password: hash
                        })
                        userModel.save().then((user) => {
                            res.status(201).json(user || {})
                        }).catch((err) => {
                            // res.status(400).json({})
                            console.error(`[ERROR] api/signup/ -> ${err}`)
                        })
                    })


            } catch (err) {
                console.error(`[ERROR] api/signup/ -> ${err}`)

                res.status(500).json({
                    code: 500,
                    message: 'Bad request'
                })
            }
        })
    }

    /**
     * Run
     */
    run () {
        this.middleware()
    }
}

module.exports = Signup

// exports.signup = (req, res, next) => {
//     bcrypt.hash(req.body.password, 10)
//         .then(hash => {
//             const user = new User({
//               email: req.body.email,
//               password: hash
//             })
//             user.save()
//                 .then(res.status(201).json({ message: 'Utilisateur créé !' }))
//                 .catch(error => res.status(400).json({ error }))
//         })
//         .catch(error => res.status(500).json({ error }))
// }
//
// exports.login = (req, res, next) => {
//
// }

