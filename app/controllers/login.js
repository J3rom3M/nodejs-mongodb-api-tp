const bcrypt = require("bcrypt");
const UserModel = require('../models/user.js')
const jwt = require('jsonwebtoken')

class Login {
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
        this.app.get('/api/login/', (req, res) => {
            try {
                this.UserModel.findOne({ email: req.body.email }).then((user) => {
                    if(!user) {
                        return res.status(401).json({ error: 'Utilisateur non trouvé !'})
                    }
                    bcrypt.compare(req.body.password, user.password)
                        .then(valid => {
                            if (!valid) {
                                return res.status(401).json({ error: 'Mot de passe incorrect !'})
                            }
                            res.status(200).json({
                                userId: user._id,
                                token: jwt.sign(
                                    { userId: user._id },
                                    'RANDOM_TOKEN_SECRET',
                                    { expiresIn: '24h' }
                                )
                            })
                        })
                        .catch(error => res.status(500).json({ error }))
                }).catch(() => {
                    res.status(201).json({
                        code: 201,
                        message: 'You\'r on the page: /api/login/'
                    })
                })
            } catch (err) {
                console.error(`[ERROR] /api/login/ -> ${err}`)

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

module.exports = Login
