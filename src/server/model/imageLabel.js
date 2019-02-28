const moogose = require('mongoose');
const Schema = moogose.Schema;

const ImageLabelSchema = new Schema({
  label: String,
})

const ImageLabel = moogose.model('imageLabel', ImageLabelSchema)

module.exports = ImageLabel