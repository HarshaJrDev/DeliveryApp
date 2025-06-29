
import mongoose from 'mongoose';

const RestaurantSchema = new mongoose.Schema({
  name: String,
  address: String,
  cuisine: String,
  phone: String
}, { timestamps: true });

const Restaurant = mongoose.model('Restaurant', RestaurantSchema);

export default Restaurant;
