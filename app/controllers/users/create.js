const UserModel = require('../../models/user.js')

const Create = class Create {
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
    this.app.post('/user/', (req, res) => {
      try {
        const userModel = new this.UserModel(req.body)

        userModel.save().then((user) => {
          res.status(200).json(user || {})
        }).catch(() => {
          res.status(200).json({})
        })
      } catch (err) {
        console.error(`[ERROR] users/show/:id -> ${err}`)

        res.status(400).json({
          code: 400,
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

module.exports = Create
