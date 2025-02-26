const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }, 
  text: String,
  created_at: Date

});

const PostModel = mongoose.model("post", PostSchema);

module.exports = PostModel;
