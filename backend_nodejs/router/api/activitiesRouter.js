var express = require("express");
const activities = require("../../controllers/activity.controller")
var router = express.Router();

router.get("/list", activities.list);

router.get("/get/:id", activities.getcustom);

router.post("/updatestatus", activities.updateStatus);

module.exports = router;
