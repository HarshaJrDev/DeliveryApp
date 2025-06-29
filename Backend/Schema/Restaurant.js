const mongoose = require('mongoose');

const RestaurantSchema = new mongoose.Schema({
  name: String,
  address: String,
  cuisine: String,
  phone: String
}, { timestamps: true });

module.exports = mongoose.model('Restaurant', RestaurantSchema);
