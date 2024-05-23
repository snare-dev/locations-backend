const User = require('../models/userModel');


const getUser = (req, res, next) => {
    //get user from db
    const userId = req.params.id;

    try {
        const user = User.findOne(userId);

        if (!user) {
            throw new Error('Could not find user')
        }

        res.status(200).json({ user });
    } catch (err) {
        return res.status(400).json({
            message: err.message
        })
    }

    //return user and all locations associated with user
}

const deleteUser = (req, res, next)=>{
    //delete user from db
    const userId = req.params.id;

    try {
        const user = User.findOne(userId);

        if (!user) {
            throw new Error('Could not find user')
        }

        user.deleteOne();

        res.status(200).json({ message: 'User deleted successfully' });
    }catch(err){
        return res.status(400).json({
            message: err.message
        })
    }
}

module.exports = {
    getUser,
    deleteUser
}