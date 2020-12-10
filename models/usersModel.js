const mongoose = require('mongoose');
const validator = require('validatorjs');

const user = mongoose.Schema({
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
        validate: [validator.isEmail, 'یه ایمیل معتبر وارد کن'],
    },
    password: {
        type: String,
        required: [true, 'پسورد پیلیز'],
        unique: true,
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
});
const User = mongoose.Model('User', user);
module.exports = User;
