var express = require("express");
const users = require("../../controllers/user.controller");
var router = express.Router();

router.post("/login", users.login);

module.exports = router;

