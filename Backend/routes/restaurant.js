import express from "express";
import {
  getAllRestaurants,
  getRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant
} from "../controllers/restaurantController.js";

const router = express.Router();

router.get("/", getAllRestaurants);
router.get("/:id", getRestaurant);
router.post("/", createRestaurant);
router.put("/:id", updateRestaurant);
router.delete("/:id", deleteRestaurant);

export default router;
