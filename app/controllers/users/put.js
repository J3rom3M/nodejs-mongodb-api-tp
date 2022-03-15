const UserModel = require('../../models/user.js')
const bcrypt = require("bcrypt");

class Put {
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
    middleware() {
        this.app.put('/user/put/:id', (req, res) => {
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
                        this.UserModel.updateOne({_if: req.params.id}, {...userModel.body, id: req.params.id}).then((user) => {
                        // this.UserModel.updateOne({_if: req.params.id}, {...req.body, id: req.params.id}).then((user) => {
                            res.status(201).json({user})
                        }).catch((err) => {
                            console.error(`[ERROR] On-> ${err}`)
                            res.status(201).json({
                                message:'Update error !'
                            })
                        })
                    })

                // const userModel = new this.UserModel({
                //     firstname: req.body.firstname,
                //     lastname: req.body.lastname,
                //     age: req.body.age,
                //     city: req.body.city,
                //     email: req.body.email,
                //     promo: req.body.promo,
                //     speciality: req.body.speciality
                // })
                // this.UserModel.updateOne({_if: req.params.id}, {...userModel.body, id: req.params.id}).then((user) => {
                //     // this.UserModel.updateOne({_if: req.params.id}, {...req.body, id: req.params.id}).then((user) => {
                //     res.status(201).json({user})
                // }).catch((err) => {
                //     console.error(`[ERROR] On-> ${err}`)
                //     res.status(201).json({
                //         message:'Update error !'
                //     })
                // })

            } catch(err) {
                console.error(`[ERROR] user/put/:id -> ${err}`)
                res.status(400).json({
                    code: 400,
                    message:'Bad request'
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

module.exports = Put
