var express = require("express");
const connection = require("../../config/databaseConnection");
var router = express.Router();

router.get("/list", (req, res) => {
  try {
    connection.query(
      "SELECT activities.id AS id ,activities.created_at AS createdate,car.license_code AS licensecode, car.city AS licensecity,car_size.name AS carsize,wash_types.name AS washtype,activities.price AS price,activities.`status` AS washstatus FROM activities LEFT JOIN car ON car.id = activities.car_id LEFT JOIN car_size ON car_size.id = car.car_size_id LEFT JOIN wash_types ON wash_types.id = activities.wash_type_id ORDER BY activities.created_at desc limit 10;",
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

router.get("/get/:id", (req, res) => {
  try {
    connection.query(
      "SELECT activities.id AS id ,activities.created_at AS createdate,car.license_code AS licensecode, car.city AS licensecity,car_size.name AS carsize,wash_types.name AS washtype,activities.price AS price,activities.`status` AS washstatus FROM activities LEFT JOIN car ON car.id = activities.car_id LEFT JOIN car_size ON car_size.id = car.car_size_id LEFT JOIN wash_types ON wash_types.id = activities.wash_type_id WHERE activities.id = ?;",
      [req.params.id],
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

router.post("/updatestatus", (req, res) => {
  try {
    connection.query(
      "Update activities SET activities.status = ? WHERE activities.id = ?;",
      [req.body.status, req.body.id],
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
