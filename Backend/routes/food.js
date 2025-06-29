const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  getAllFoodsByRestaurant,
  getFoodItem,
  createFoodItem,
  updateFoodItem,
  deleteFoodItem
} = require("../controllers/foodController");

router.get("/", getAllFoodsByRestaurant);
router.get("/:foodId", getFoodItem);
router.post("/", createFoodItem);
router.put("/:foodId", updateFoodItem);
router.delete("/:foodId", deleteFoodItem);

module.exports = router;
