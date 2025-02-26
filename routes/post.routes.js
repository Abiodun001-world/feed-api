const Router = require('express').Router;

const postController = require('../controllers/post.controller');

const route = Router();

route.post('/posts', postController.CreatePost);
route.get('/posts/:postId', postController.GetPost);
route.get('/posts', postController.GetAllPost);
route.patch('/posts/:postId', postController.DeletePost);

module.exports = route;


