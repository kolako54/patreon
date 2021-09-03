const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const validator = require('validatorjs');

const { ApolloError } = require('apollo-server-express');
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
        required: [true, 'نمیتونی بدون تایید کردن پسوردت ثبت نام کنی'],
        // validate: {
        //     validator: function (el) {
        //         return this.password === el;
        //     },
        //     message: 'Passwords are not same!',
        // },
    },
    profile_pic: {
        type: String,
        default: 'https://cdn4.iconfinder.com/data/icons/instagram-ui-twotone/48/Paul-18-512.png',
    },
    resetTokenExpires: Date,
    passwordChangeAt: Date,
    hashToken: String,
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
} // eslint-disable-next-line no-use-before-define);
);
UserSchema.virtual('comments', {
    ref: 'Comment',
    foreignField: 'user',
    localField: '_id',
});
UserSchema.virtual('posts', {
    ref: 'Post',
    foreignField: 'user',
    localField: '_id',
});
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    if(this.password !== this.confirmPassword) throw new ApolloError('Passwords are not same!', 400);
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;
    next();
});

UserSchema.pre("save", function (next) {
    if (!this.isModified('password') || this.isNew) return next();
    this.passwordChangeAt = Date.now() - 1000;
    next();

});

UserSchema.methods.checkPasswordChangeAt = function (JWTTimeStamp){
    if(passwordChangeAt){
        const formatTimeChange = this.passwordChangeAt.getTime() / 1000;
        return formatTimeChange < JWTTimeStamp;
    }
    return true
}



UserSchema.methods.correctPassword = async function (candidatePassword, mainPassword) {
    return await bcrypt.compare(candidatePassword, mainPassword);
}
UserSchema.methods.createDummyToken = function () {


    const resetToken = crypto.randomBytes(32).toString('hex');
    this.hashToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    this.resetTokenExpires = Date.now() + (1000 * 60 * 10);
    return resetToken
}

UserSchema.methods.checkChangePassword = function(JWTTimestamp){
    if (this.passwordChangedAt) {
        const timePassChange = this.passwordChangedAt.getTime() / 1000;
        return JWTTimestamp < timePassChange; //200 300
      }
      return false;
}


/* eslint-enable */
const User = mongoose.model('User', UserSchema);
module.exports = User;
