const mongoose = require('mongoose');
const CatSchema = mongoose.Schema({
  title: {
      type: String,
      required: true
  }, 
  orderBy: {
      type: Number, 
      required: true, 
      default: 1
  }
});

const Cat = module.exports = mongoose.model('categories', CatSchema);

module.exports.getAll = function(callback){
    Cat.find().sort({'orderBy': -1}).exec(callback); 

}

module.exports.addNewCat = function(newCat, callback){
    newCat.save(callback); 

}

module.exports.editCat = function(catId, editedCat, callback){
    Cat.findOneAndUpdate({'_id': catId}, editedCat).exec(callback);
}

module.exports.removeCat = function(catId, callback){
    Cat.remove({'_id': catId}).exec(callback);
}

module.exports.getOneCat = function(catId, callback){
    Cat.findOne({'_id': catId}).exec(callback); 
}


