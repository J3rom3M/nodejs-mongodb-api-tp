const UserModel = require('../../models/user.js')

const Show = class Show {
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
    this.app.get('/users/show/:id', (req, res) => {
      try {
        this.UserModel.findById(req.params.id).then((user) => {
          res.status(200).json(user || {})
        }).catch(() => {
          res.status(200).json({
            code: 200,
            message: 'You\'r on page: /users/show/' + req.params.id
          })
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

module.exports = Show
