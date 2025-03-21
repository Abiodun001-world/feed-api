const PostModel = require('../models/post.model');

const CreatePost = async ({ text, user }) => {
    const post = await PostModel.create({
        text,
        user_id: user._id,
        created_at: new Date()
    })

    return {
        code: 201,
        success: true,
        message: 'Post created successfully',
        data: {
            post,
        }
    }
}
const GetPost = async ({ postId }) => {
    try {
        const post = await PostModel.findOne({ _id: postId });

        if (!post) {
            const error = new Error('Post not found')
            error.type = 'NOT_FOUND';
            throw error;
            // return {
            //     code: 404,
            //     success: false,
            //     message: 'Post not found',
            //     data: null,
            // }
        }
    
        return {
            code: 200,
            success: true,
            message: 'Post found',
            data: {
                post
            },
        }
    
    } catch (error) {
        return {
            code: 500,
            success: false,
            message: error.message || 'Server Error',
            data: null,
        }
    }

}
const GetAllPost = async ({ user_id, text, page = 1, perPage = 10 }) => {

    const query = { }

    if (user_id) {
        query.user_id = user_id // query = { user_id: user_id }
    }

    if (text) {
        query.text = {$regex : text } // query = { text: { $regex : text }}
    }

    const posts = await PostModel.paginate(query, { page, limit: perPage }) 

    return {
        code: 200,
        success: true,
        message: 'Posts found',
        data: {
            posts
        },
    }
}


const UpdatePost = async ({ postId, text, user }) => {
    const post = await PostModel.findOne({ _id: postId });

    if (!post) {
        return {
            code: 404,
            success: false,
            message: 'Post not found',
            data: null,
        }
    }

    if (post.user_id !== user._id) {
        return {
            code: 403,
            success: false,
            message: 'Post does not belong to user',
            data: null,
        }
    }

    post.text = text || post.text
    post.update_at = new Date()

    await post.save()

    return {
        code: 200,
        success: true,
        message: 'Post updated successfully',
        data: {
            post
        },
    }
}
const DeletePost = async ({ user, postId }) => {
    const post = await PostModel.findOne({ _id: postId, user_id: user._id });

    if (!post) {
        return {
            code: 404,
            success: false,
            message: 'Post not found',
            data: null,
        }
    }

    await post.deleteOne({
        _id: postId, user_id: user._id
    })

    return {
        code: 200,
        success: true,
        message: 'Post deleted successfully',
        data: null,
    }
}


module.exports = {
    CreatePost,
    GetAllPost,
    GetPost,
    UpdatePost,
    DeletePost
}