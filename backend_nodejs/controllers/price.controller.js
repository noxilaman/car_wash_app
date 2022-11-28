const db = require("../models");
const Price = db.prices;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "name can not be empty!",
    });
    return;
  }

  if (!req.body.desc) {
    res.status(400).send({
      message: "desc can not be empty!",
    });
    return;
  }

  // Create a Tutorial
  const price = {
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
  const wash_type_id = req.params.wash_type_id;
  const car_size_id = req.params.car_size_id;
  var condition = {
    wash_type_id: wash_type_id,
    car_size_id: car_size_id
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
