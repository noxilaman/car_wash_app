const db = require("../models");
const { QueryTypes } = require("sequelize");
const Price = db.prices;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.shop_id) {
    res.status(400).send({
      message: "shop can not be empty!",
    });
    return;
  }

  if (!req.body.wash_type_id) {
    res.status(400).send({
      message: "wash type can not be empty!",
    });
    return;
  }

  if (!req.body.car_size_id) {
    res.status(400).send({
      message: "car size can not be empty!",
    });
    return;
  }

  if (!req.body.price) {
    res.status(400).send({
      message: "price can not be empty!",
    });
    return;
  }

  var condition = {
    shop_id: req.body.shop_id,
    wash_type_id: req.body.wash_type_id,
    car_size_id: req.body.car_size_id
  };

  const result = await Price.findAll({ where: condition });
  if (result.length > 0) {
    res.status(400).send({
      message: "Already have prices!",
    });
    return;
  }

  // Create a Tutorial
  const price = {
    shop_id: req.body.shop_id,
    wash_type_id: req.body.wash_type_id,
    car_size_id: req.body.car_size_id,
    price: req.body.price,
  };

  // Save Tutorial in the database
  await Price.create(price)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Price.",
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => { 
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

    Price.findAll({ where: condition })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving prices.",
        });
      });
};

exports.getselected = (req, res) => {
  console.log("Param req");
  console.log(req.params);
  const shop_id = req.params.shop_id;
  const wash_type_id = req.params.wash_type_id;
  const car_size_id = req.params.car_size_id;
  var condition = {
    shop_id: shop_id,
    wash_type_id: wash_type_id,
    car_size_id: car_size_id,
  };

  Price.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving prices.",
      });
    });
};


// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Price.findByPk(id)
      .then((data) => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Price with id=${id}.`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving Price with id=" + id,
        });
      });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Price.update(req.body, {
      where: { id: id },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "Price was updated successfully.",
          });
        } else {
          res.send({
            message: `Cannot update Price with id=${id}. Maybe Price was not found or req.body is empty!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating Price with id=" + id,
        });
      });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Price.destroy({
      where: { id: id },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "Price was deleted successfully!",
          });
        } else {
          res.send({
            message: `Cannot delete Price with id=${id}. Maybe Price was not found!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Could not delete Price with id=" + id,
        });
      });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    Price.destroy({
      where: {},
      truncate: false,
    })
      .then((nums) => {
        res.send({ message: `${nums} Prices were deleted successfully!` });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all prices.",
        });
      });
};

exports.fncreate = async (shop_id ,wash_type_id, car_size_id, price) => {
  // Validate request
  if (!shop_id) {
    return;
  }

  if (!wash_type_id) {
    return;
  }

  if (!car_size_id) {
    return;
  }
  
  if (!price) {
    return;
  }

  // Create a Tutorial
  const priceObj = {
    shop_id: shop_id,
    wash_type_id: wash_type_id,
    car_size_id: car_size_id,
    price: price,
  };

  // Save Tutorial in the database
  const result = await Price.create(priceObj);
  if (result === null) {
    console.log("Not found!");
    return [];
  } else {
    return result;
  }
};

exports.list = async (req, res) =>{
  const data = await Price.seq.query(
    "SELECT prices.id, prices.price, shops.name as shop_name, car_sizes.name as car_size_name , wash_types.name as wash_type_name FROM prices LEFT JOIN car_sizes ON car_sizes.id = prices.car_size_id LEFT JOIN wash_types ON wash_types.id = prices.wash_type_id LEFT JOIN shops ON shops.id = prices.shop_id",
    {
      type: QueryTypes.SELECT,
    }
  );
     if (data) {
       res.send(data);
     } else {
       res.status(404).send({
         message: `Cannot find Activity.`,
       });
     }
};