const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new Schema({
    email : {type : String},
    name : {type : String},
    password : {type : String},
    createdBy : {type : String},
    createdAt : {type : Number},
    updatedBy : {type : String},
    updatedAt : {type : Number}
})

const User = mongoose.model('user', UserSchema, 'user');

module.exports = User;