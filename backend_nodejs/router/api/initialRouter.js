var express = require("express");
const connection = require("../../config/databaseConnection");
var router = express.Router();

router.get("/", (req, res) => {
  var sizecarbase = ["S", "M", "L", "XL"];

  var washtypebase = [
    "ล้างสี",
    "ดูดฝุ่น",
    "ล้างสี + ดูดฝุ่น",
    "ล้างสี + ดูดฝุ่น + ขัดเครือบ",
  ];

  var pricelists = [
    ["ล้างสี", "S", "80"],
    ["ล้างสี", "M", "80"],
    ["ล้างสี", "L", "80"],
    ["ล้างสี", "XL", "80"],
    ["ดูดฝุ่น", "S", "80"],
    ["ดูดฝุ่น", "M", "80"],
    ["ดูดฝุ่น", "L", "80"],
    ["ดูดฝุ่น", "XL", "80"],
    ["ล้างสี + ดูดฝุ่น", "S", "80"],
    ["ล้างสี + ดูดฝุ่น", "M", "80"],
    ["ล้างสี + ดูดฝุ่น", "L", "80"],
    ["ล้างสี + ดูดฝุ่น", "XL", "80"],
    ["ล้างสี + ดูดฝุ่น + ขัดเครือบ", "S", "80"],
    ["ล้างสี + ดูดฝุ่น + ขัดเครือบ", "M", "80"],
    ["ล้างสี + ดูดฝุ่น + ขัดเครือบ", "L", "80"],
    ["ล้างสี + ดูดฝุ่น + ขัดเครือบ", "XL", "80"],
  ];

  sizecarbase.map((opt) => {
    try {
      console.log(opt);
      connection.query(
        "INSERT INTO car_size (`name`, `desc`, created_at, modified_at) value (?,?,now(),now());",
        [opt, opt],
        function (error, results, fields) {
          if (error) throw error;
          console.log(results);
        }
      );
    } catch (error) {
      console.log(error);
    }
  });

  washtypebase.map((opt) => {
    try {
      console.log(opt);
      connection.query(
        "INSERT INTO wash_types (`name`, `desc`, created_at, modified_at) value (?,?,now(),now());",
        [opt, opt],
        function (error, results, fields) {
          if (error) throw error;
          console.log(results);
        }
      );
    } catch (error) {
      console.log(error);
    }
  });

  pricelists.map((opt) => {
    try {
      // console.log(opt[0]);
      connection.query(
        "INSERT INTO prices (`wash_type_id`, `car_size_id`,price, created_at, modified_at) value ((select id from wash_types where `name` = ? limit 1),(select id from car_size where `name` = ? limit 1),?,now(),now());",
        [opt[0], opt[1], opt[2]],
        function (error, results, fields) {
          if (error) throw error;
          console.log(results);
        }
      );
    } catch (error) {
      console.log(error);
    }
  });
});


module.exports = router;