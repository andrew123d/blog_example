const mongoose = require('mongoose');
const Cat = require('./categories')
const PostSchema = mongoose.Schema({
  title: {
      type: String,
      required: true
  }, 
  description_full: {
      type: String, 
      required: true
  },
  description_short: {
    type: String, 
    required: true
  }, 
  dateAdded: {
      type: Date, 
      required: true, 
      default: Date.now
  }, 
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'categories',
    required: true
  }
});

const Posts = module.exports = mongoose.model('posts', PostSchema);

module.exports.getAllPosts = function(callback){
    Posts.find().sort({'dateAdded': -1}).populate('category').exec(callback); 

}

module.exports.addNewPost = function(newPost, callback){
    newPost.save(callback); 

}

module.exports.editPost = function(postId, editedPost, callback){
    Posts.findOneAndUpdate({'_id': postId}, editedPost).exec(callback);
}

module.exports.removePost = function(postId, callback){
    Posts.remove({'_id': postId}).exec(callback);
}

module.exports.getAllPostsFromCat = function(catId, callback){
    Posts.find({'category': catId})
    .sort({'dateAdded': -1})
    .populate('category')
    .exec(callback);
}

module.exports.getSinglePost = function(postId, callback){
    Posts.findOne({'_id': postId})
    .populate('category')
    .exec(callback); 
}