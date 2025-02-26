const PostService = require("../services/post");

const CreatePost = async (req, res) => {
  const payload = req.body;
  const user = req.user;

  const serviceResponse = await PostService.CreatePost({
    text: payload.text,
    user,
  });

  return res.status(serviceResponse.code).json(serviceResponse);
};

const GetPost = async (req, res) => {
  const postId = req.params.postId;

  const serviceResponse = await PostService.GetPost({
    // post/:postId
    // req.params.postId;
    postId,
  });

  return res.status(serviceResponse.code).json(serviceResponse);
};

const GetAllPost = async (req, res) => {
  const serviceResponse = await PostService.GetAllPost({});

  return res.status(serviceResponse.code).json(serviceResponse);
};

const UpdatePost = async (req, res) => {
  const postId = req.params.postId;
  const user = req.user;

  const serviceResponse = await PostService.UpdatePost({
    // post/:postId
    // req.params.postId;
    postId,
    user,
  });

  return res.status(serviceResponse.code).json(serviceResponse);
};

const DeletePost = async (req, res) => {
  const postId = req.params.postId;
  const user = req.user;

  const serviceResponse = await PostService.DeletePost({
    // post/:postId
    // req.params.postId;
    postId,
    user,
  });

  return res.status(serviceResponse.code).json(serviceResponse);
};

module.exports = {
  CreatePost,
  GetPost,
  GellAllPost,
  UpdatePost,
  DeletePost,
};
