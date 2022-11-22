var express = require("express");
const connection = require("../../config/databaseConnection");
var router = express.Router();

router.get("/getselected/:typewashid/:carsizeid", (req, res) => {
  try {
    connection.query(
      "select price from prices where wash_type_id = ? and car_size_id = ? limit 1;",
      [req.params.typewashid, req.params.carsizeid],
      function (error, results, fields) {
        if (error) throw error;
        console.log(results);

        return res.status(200).json(results);
      }
    );

    //connection.end();
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
