const mongoose = require('mongoose');
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
}, // eslint-disable-next-line no-use-before-define);
);



/* eslint-enable */
const User = mongoose.model('User', UserSchema);
module.exports = User;
