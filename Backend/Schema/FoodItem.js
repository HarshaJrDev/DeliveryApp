const mongoose = require('mongoose');

const FoodItemSchema = new mongoose.Schema({
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' },
  name: String,
  description: String,
  price: Number,
  image: String
}, { timestamps: true });

module.exports = mongoose.model('FoodItem', FoodItemSchema);
