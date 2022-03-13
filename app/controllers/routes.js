const Show = require('./users/show.js')
const Create = require('./users/create.js')
const Put = require('./users/put.js');
const Delete = require('./users/delete.js');

module.exports = {
  users: {
    Show
  },
  user: {
    Create,
    Delete,
    Put
  }
}
