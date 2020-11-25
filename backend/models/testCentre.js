const mongoose = require ('mongoose');

const postSchema = mongoose.Schema({
  testCentreName: {type: String, required:true}
});

module.exports = mongoose.model('TestCentre',postSchema);
