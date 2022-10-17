const mongoose = require('mongoose')
const toJson = require('@meanie/mongoose-to-json')

mongoose.plugin(toJson);

const UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    adminRole: Boolean 
});

module.exports = mongoose.model('User', UserSchema);