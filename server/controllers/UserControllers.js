const User = require('../models/usersModel');
const catchAsync = require('../utilities/catchAsync');

exports.createUser = catchAsync(async (req, res) => {
    const user = await User.create(req.body);
    console.log(User.create);
    console.log(user);
    res.status(202).json({
        status: 'created!',
        data: user,
    });
});
// eslint-disable-next-line
exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.find({});
    res.status(200).json({
        status: 'Ok',
        data: users,
    });
});
