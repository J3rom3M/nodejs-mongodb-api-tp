const bcrypt = require('bcrypt')
const UserModel = require('../models/user.js')

class Signup {
    /**
     * @constructor
     * @param {Object} app
     * @param {Object} config
     * @param {Object} connect
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
                bcrypt.hash(req.body.password, 10)
                    .then(hash => {
                        const userModel = new this.UserModel({
                            firstname: req.body.firstname,
                            lastname: req.body.lastname,
                            age: req.body.age,
                            city: req.body.city,
                            email: req.body.email,
                            password: hash,
                            promo: req.body.promo,
                            speciality: req.body.speciality
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
