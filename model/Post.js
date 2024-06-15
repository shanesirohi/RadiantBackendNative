const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Post schema
const postSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Assuming a reference to User model
  image: { type: String, required: true },
  caption: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Create a model based on the schema
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
