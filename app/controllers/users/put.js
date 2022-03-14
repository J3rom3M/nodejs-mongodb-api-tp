const UserModel = require('../../models/user.js')

class Put {
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
    middleware() {
        this.app.put('/user/put/:id', (req, res) => {
            try {
                this.UserModel.updateOne({_if: req.params.id}, {...req.body, id: req.params.id}).then((user) => {
                    res.status(201).json({user})
                }).catch((err) => {
                    console.error(`[ERROR] On-> ${err}`)
                    res.status(201).json({
                        message:'Update error !'
                    })
                })
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