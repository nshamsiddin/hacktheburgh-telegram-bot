const mongoose = require('mongoose')
const db = require('../../modules/mongodb')

// User Model
const UserSchema = new db.mongoose.Schema({
    id: { type: Number, unique: true },
    firstname: { type: String, maxlength: 128 },
    surname: { type: String, maxlength: 128 },
    phoneno: { type: String, maxlength: 128 },
    postcode: { type: String, maxlength: 128 },
    gender: { type: String, enum: ['male', 'female'] },
    request: { type: Object },
    active: { type: Boolean, default: false }
})


exports.User = db.connect.model('User', UserSchema)