const mongoose = require ('mongoose');

const postSchema = mongoose.Schema({
  testKitName: {type: String, required:true},
  testKitStock: {type: String, required:true}
});

module.exports = mongoose.model('TestKit',postSchema);
