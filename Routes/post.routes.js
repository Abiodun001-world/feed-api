const Router = require('express').Router
const PostController = require('../controllers/post.controller');
const AuthMiddleware = require('../middlwares/auth.middleware');
const PostMiddleware = require('../middlwares/post.middlware')

const route = Router()

route.post('/', PostMiddleware.ValidateCreatePost, AuthMiddleware.ValidateToken, PostController.CreatePost);
route.get('/:postId', AuthMiddleware.ValidateToken, PostController.GetPost);
route.get('/', AuthMiddleware.ValidateToken, PostController.GetAllPost);
route.patch('/:postId', AuthMiddleware.ValidateToken, PostController.UpdatePost);
route.delete('/:postId', AuthMiddleware.ValidateToken, PostController.DeletePost);

module.exports = route