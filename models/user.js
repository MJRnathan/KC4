const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName:{type:String},
    lastName:{type:String},
    phone:{type:Number},
    add_to_telegram:{type:Boolean, default:'false'},
    email:{type:String, unique:true, required:true},
    password:{type:String, required:true},
    subscription_valid_from:{type:Number, default:Date.now().valueOf()},
    subscription_valid_upto:{type:Number, default:Date.now().valueOf()},
    // place_holder1:{type:String, unique:true},
    // place_holder2:{type:String, unique:true},
})

module.exports = mongoose.model('User', userSchema)
