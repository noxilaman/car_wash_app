var express = require("express");
const connection = require("../../config/databaseConnection");
var router = express.Router();

router.get("/getall", (req, res) => {
  try {
    connection.query(
      "select * from wash_types;",
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
