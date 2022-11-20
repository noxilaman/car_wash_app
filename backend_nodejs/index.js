const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connection = require('./config/databaseConnection');

const app = express();
const port = 8086;

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api', (req, res) => {
    res.send('Hello World, from express');
});

app.get('/api/sizecar/getall', (req, res) => {
    try {
        connection.query('select * from car_size;', function (error, results, fields) {
        if (error) throw error;
        console.log('The solution is: ', results[0].solution);

        return res.status(200).json(results);
        });
        
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
             console.log('The solution is: ', results[0].solution);
        });
    
   // connection.end();
        
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))