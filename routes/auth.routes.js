const Router = require('express').Router;

const authController = require('../controllers/auth.controller');

const route = Router();

route.post('/login', authController.Login);
route.post('/signup', authController.Signup);

module.exports = route;


