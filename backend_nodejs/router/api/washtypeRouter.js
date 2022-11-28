var express = require("express");
const connection = require("../../config/databaseConnection");
const washtypes = require("../../controllers/wash_type.controller")
var router = express.Router();

router.get("/getall", washtypes.findAll);

router.post("/", washtypes.create);

module.exports = router;
