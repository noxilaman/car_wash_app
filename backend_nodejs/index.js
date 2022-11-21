const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connection = require('./config/databaseConnection');
const multer = require("multer");

const app = express();
const port = 8086;

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api', (req, res) => {
    res.send('Hello World, from express');
});

app.get("/api/initial", (req, res) => {

    var sizecarbase = [
      "S",
      "M",
      "L",
      "XL",
    ];

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


app.get('/api/sizecar/getall', (req, res) => {
    try {
        connection.query('select * from car_size;', function (error, results, fields) {
        if (error) throw error;
        console.log(results);

        return res.status(200).json(results);
        });
        
        //connection.end();
    } catch (error) {
        console.log(error);
    }
    
});

app.get("/api/washtype/getall", (req, res) => {
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

app.get("/api/price/getselected/:typewashid/:carsizeid", (req, res) => {
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



app.post('/api/washcar/create', (req, res) => {
    const postData = req.body;
 
    connection.query("INSERT INTO car (license_code, city, car_size_id, note, created_at, modified_at) values (?,?,?,'',now(),now())",
        [postData.licensename,postData.city,postData.sizeId], 
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

        }); 
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))