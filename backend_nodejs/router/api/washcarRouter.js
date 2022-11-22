var express = require("express");
const connection = require("../../config/databaseConnection");
var router = express.Router();
router.get("/", function (req, res) {
  res.send("Heroes Page");
});
router.post("/create", function (req, res) {
  const postData = req.body;

  connection.query(
    "INSERT INTO car (license_code, city, car_size_id, note, created_at, modified_at) values (?,?,?,'',now(),now())",
    [postData.licensename, postData.city, postData.sizeId],
    function (error, results, fields) {
      if (error) throw error;
      console.log(results);
      connection.query(
        "INSERT INTO activities (car_id, wash_type_id, status, note, price, created_at, modified_at) values (?,?,'Pending','',?,now(),now())",
        [results.insertId, postData.washTypeId, postData.price],
        function (error, results, fields) {
          if (error) throw error;
          return res.status(200).json(results);
        }
      );
    }
  );
});
module.exports = router;