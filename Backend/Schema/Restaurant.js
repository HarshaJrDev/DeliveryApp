// Schema/Restaurant.js
import mongoose from 'mongoose';

const RestaurantSchema = new mongoose.Schema({
  name: String,
  address: String,
  cuisine: String,
  phone: String
}, { timestamps: true });

export const Restaurant = mongoose.model("Restaurant", RestaurantSchema);
