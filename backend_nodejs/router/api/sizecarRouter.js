var express = require("express");
const carsizes = require("../../controllers/car_size.controller");
var router = express.Router();

router.get("/getall", carsizes.findAll);

router.post("/", carsizes.create);

module.exports = router;
