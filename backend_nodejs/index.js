const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require("multer");
const washcarRouter = require("./router/api/washcarRouter");
const initialRouter = require("./router/api/initialRouter");
const sizecarRouter = require("./router/api/sizecarRouter");
const washtypeRouter = require("./router/api/washtypeRouter");
const priceRouter = require("./router/api/priceRouter");
const activitiesRouter = require("./router/api/activitiesRouter");

const app = express();
const port = 8086;

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/washcar", washcarRouter);
app.use("/api/initial", initialRouter);
app.use("/api/sizecar", sizecarRouter);
app.use("/api/washtype", washtypeRouter);
app.use("/api/activities", activitiesRouter);

app.use("/api/price", priceRouter);
app.get('/api', (req, res) => {
    res.send('Hello World, from express');
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))