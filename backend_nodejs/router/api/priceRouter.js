var express = require("express");
const prices = require("../../controllers/price.controller")
var router = express.Router();

router.get("/getselected/:wash_type_id/:car_size_id", prices.getselected);

router.get("/getall", prices.findAll);

router.post("/", prices.create);

module.exports = router;
