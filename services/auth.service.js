const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const Login = async ({ email, password }) => {
    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return {
                code: 400,
                success: false,
                data: null,
                message: 'Invalid credentials'
            }
        }
    
        const validPassword = await user.isValidPassword(password);
    
        if (!validPassword) {
            return {
                code: 400,
                success: false,
                data: null,
                message: 'Invalid credentials'
            }
        }
    
        const token = await jwt.sign({ email }, process.env.SECRET_KEY || 'super_secret');
    
        return {
            code: 200,
            success: true,
            data: { user, token },
            message: 'Login successful'
        }
    } catch (error) {
        return {
            code: 500,
            success: false,
            data: null,
            message: error.message || 'Sever error'
        }
    }

}

const Signup = async ({ username, password, email }) => {
    try {

        // const existingUser = find by the user email and username
        // if it exists, return an error early 
        const newUser = await UserModel.create({
            username,
            email,
            password
        })
    
        const token = await jwt.sign({ email }, process.env.SECRET_KEY || 'super_secret');
    
        return {
            code: 201,
            success: true,
            message: 'user signup successful',
            data: {
                user: newUser,
                token,
            }
        }
    } catch (error) {
        return {
            code: 500,
            success: false,
            data: null,
            message: error.message || 'Sever error'
        }
    }
}

module.exports = {
    Login,
    Signup
}
