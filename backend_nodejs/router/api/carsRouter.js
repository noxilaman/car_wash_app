var express = require("express");
const cars = require("../../controllers/car.controller");
var router = express.Router();

router.post("/", cars.create);

router.get("/", cars.findAll);

module.exports = router;
