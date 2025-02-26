const PostModel = require("../models/post.model");

const CreatePost = async ({ text, user }) => {
  const post = await PostModel.create({
    text,
    user_id: user_id,
    created_at: new Date(),
  });

  return {
    code: 201,
    success: "true",
    message: "post created Successfully",
    data: {
      post,
    },
  };
};

const GetPost = async ({ postId }) => {
  const post = await PostModel.findOne({ _id: postId });

  if (!post) {
    return {
      code: 404,
      success: "false",
      message: "post not found",
      data: null,
    };
  }

  return {
    code: 200,
    success: true,
    message: "post found",
    data: {
      post,
    },
  };
};

const GetAllPost = async ({}) => {
  const posts = await PostModel.find({});

  return {
    code: 200,
    sucess: true,
    message: "posts found",
    data: {
      posts,
    },
  };
};

const UpdatePost = async ({ postId, text, user }) => {
  const post = await PostModel.findOne({ _id: postId });

  if (!post) {
    return {
      code: 404,
      success: "false",
      message: "post not found",
      data: null,
    };
  }

  if (post.user_id !== user._id) {
    return {
      code: 401,
      success: "false",
      message: "post does not belong to user",
      data: null,
    };
  }

  post.text = text;

  post.update_at = new Date();

  await post.save();

  return {
    code: 200,
    success: true,
    message: "post updated successfully",
    data: {
      post,
    },
  };
};

const DeletePost = async ({ user, postId }) => {
  const post = await PostModel.findOne({ _id: postId, user_id: user._id });

  if (!post) {
    return {
      code: 404,
      success: "false",
      message: "post not found",
      data: null,
    };
  }

  await post.deleteOne({
    _id: postId,
    user_id: user._id,
  });

  return {
    code: 200,
    success: true,
    message: "post deleted successfully",
    data: null,
}
};

module.exports = {
  CreatePost,
  GetPost,
  GetAllPost,
  UpdatePost,
  DeletePost,
};
