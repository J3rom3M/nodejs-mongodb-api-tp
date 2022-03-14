const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  age: Number,
  city: String,
  email: String, required: true, unique:true,
  password: String, required: true
}, {
  collection: 'users',
  minimize: false,
  versionKey: false
}).set('toJSON', {
  transform: (doc, ret) => {
    ret.id = ret._id

    delete ret._id
  }
})

Schema.plugin(uniqueValidator)

module.exports = Schema