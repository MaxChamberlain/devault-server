const mongoose = require('mongoose')
const bcrypt = require ('bcryptjs')

const userSchema = new mongoose.Schema({
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    theme: {
        type: String,
        required: true,
        default: 'light',
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    company_code: {
        type: String,
        required: true,
    },
    isApproved: {
        type: Boolean,
        required: true,
        default: false
    }
}
, { timestamps: true }
);

userSchema.set('collection', 'users');

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.methods.matchPassword = async function(enteredPass){
    return await bcrypt.compare(enteredPass, this.password)
}

const User = mongoose.model("User", userSchema);

module.exports = User;