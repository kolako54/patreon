const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const EmailValidator = require('../plugins/ValidationEmail');

/* eslint-disable */

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'نکنه بدون وارد کردن اسمت انتظار داری ثبت نام کنی؟'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'باید ایمیلتو وارد کنی'],
        trim: true,
        lowercase: true,
        unique: true,
        validate: [EmailValidator, 'یه ایمیل درست وارد کن'],        
    },
    password: {
        type: String,
        required: [true, 'پسورد پیلیز'],
    },
    confirmPassword: {
        type: String,
        require: [true, 'نمیتونی بدون تایید کردن پسوردت ثبت نام کنی'],
        trim: true,
        validate: {
            validator: function (el) {
                return this.password === el;
            },
            message: 'پسوردا مطابقت ندارن دوست عزیز زدی به کاهدون',
        },
    },
    resetTokenExpires: Date,
    passwordChangeAt: Date,
    hashToken: String,
    role:{
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, // eslint-disable-next-line no-use-before-define);
);

UserSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;
    next();
});

UserSchema.pre("save", function(next){
    if(!this.isModified('password') || this.isNew) return next();
    this.passwordChangeAt = Date.now() - 1000;
})

UserSchema.methods.correctPassword = async function(candidatePassword, mainPassword){
    return await bcrypt.compare(candidatePassword, mainPassword);
}
UserSchema.methods.createDummyToken = function(){

const resetToken = crypto.randomBytes(32).toString('hex');
this.hashToken = crypto.createHash('sha256').update(resetToken).digest('hex')
this.resetTokenExpires = Date.now() + (1000 * 60 * 10);
return resetToken
}
/* eslint-enable */
const User = mongoose.model('User', UserSchema);
module.exports = User;
