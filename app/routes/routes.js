const Show = require('../controllers/users/show.js')
const Create = require('../controllers/users/create.js')
const Put = require('../controllers/users/put.js');
const Delete = require('../controllers/users/delete.js');
const Signup = require('../controllers/signup')
const Login = require('../controllers/login')

module.exports = {
  users: {
    Show
  },
  user: {
    Create,
    Delete,
    Put
  },
  api: {
    Signup,
    Login
  }
}
