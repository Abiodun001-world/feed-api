const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  text: String,
  created_at: Date,
});

const PostModel = mongoose.model("post", PostSchema);

module.exports = PostModel;
