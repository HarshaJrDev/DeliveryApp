const FoodItem = require("../models/FoodItem");

exports.getAllFoodsByRestaurant = async (req, res) => {
  try {
    const foodItems = await FoodItem.find({ restaurantId: req.params.restaurantId });
    res.json(foodItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getFoodItem = async (req, res) => {
  try {
    const food = await FoodItem.findById(req.params.foodId);
    if (!food || food.restaurantId.toString() !== req.params.restaurantId)
      return res.status(404).json({ error: "Food item not found for this restaurant" });
    res.json(food);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createFoodItem = async (req, res) => {
  try {
    const newFood = new FoodItem({
      ...req.body,
      restaurantId: req.params.restaurantId
    });
    await newFood.save();
    res.status(201).json(newFood);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateFoodItem = async (req, res) => {
  try {
    const food = await FoodItem.findByIdAndUpdate(req.params.foodId, req.body, { new: true });
    res.json(food);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteFoodItem = async (req, res) => {
  try {
    await FoodItem.findByIdAndDelete(req.params.foodId);
    res.json({ message: "Food item deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
