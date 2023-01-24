const express = require("express");
const router = express.Router();
const location = require("../Controller/LocationController")
const restaurants = require("../Controller/RestaurantController")
const mealTypes = require("../Controller/MealTypeController")
const menuitem = require("../Controller/MenuItemController")
const orders = require("../Controller/OrdersController")
const payment = require("../Controller/PaymentController")

router.get("/api/location",location.getLocationList)

router.get("/api/restaurants/:loc_id",restaurants.getRestaurantListByLocationID)

router.get("/api/restaurantlistbyid/:rest_id",restaurants.getRestaurantListByID)

router.get("/api/mealtype",mealTypes.getMealTypesList)

router.get("/api/menuitembyid/:rest_id",menuitem.getMenuItemsByID)

router.post("/api/saveneworders",orders.saveNewOrders);

router.post("/api/filter",restaurants.filter)

router.get("/api/get-menu-items/:rest_id",restaurants.getMenuItems)

//payment

router.post("/api/gen-order-id",payment.genOrderId)

// verify payment
router.post("/api/verify-payment",payment.verifyPayment)

//search restaurant

router.post("/api/search-restaurant",restaurants.searchRestaurant)

module.exports = router;