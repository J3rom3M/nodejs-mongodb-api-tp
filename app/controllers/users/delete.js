const UserModel = require('../../models/user.js')

class Delete {
    /**
     * @constructor
     * @param {Object} app
     * @param {Object} config
     */
    constructor (app, connect, config) {
        this.app = app;
        this.UserModel = connect.model('User', UserModel)

        this.run()
    }

    /**
     * Middleware
     */
    middleware() {
        this.app.delete('/user/delete/:id', (req, res) => {
            try {
                this.UserModel.deleteOne({_if: req.params.id}).then((user) => {
                    res.status(200).json({user})
                }).catch(() => {
                    res.status(200).json({})
                })
            } catch(err) {
                console.error(`[ERROR] user/delete/:id -> ${err}`)
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

module.exports = Delete