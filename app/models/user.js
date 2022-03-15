const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = new mongoose.Schema({
  firstname: String,
  lastname: String,
  age: Number,
  city: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  promo: String,
  speciality: String
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