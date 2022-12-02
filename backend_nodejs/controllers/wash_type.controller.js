const db = require("../models");
const WashType = db.wash_types;
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

  var condition = {
    name: req.body.name,
  };

  const chk = await WashType.findAll({ where: condition });
  if (chk.length > 0) {
    res.status(401).send({
      message: "Already have prices!",
    });
    return;
  }

  // Create a Tutorial
  const washtype = {
    name: req.body.name,
    desc: req.body.desc,
  };

  // Save Tutorial in the database
  await WashType.create(washtype)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Wash Type.",
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => { 
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

    WashType.findAll({ where: condition })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving wash_types.",
        });
      });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    WashType.findByPk(id)
      .then((data) => {
        if (data) {
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Wash Type with id=${id}.`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving Wash Type with id=" + id,
        });
      });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    WashType.update(req.body, {
      where: { id: id },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "Wash Type was updated successfully.",
          });
        } else {
          res.send({
            message: `Cannot update Wash Type with id=${id}. Maybe Wash Type was not found or req.body is empty!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating Wash Type with id=" + id,
        });
      });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    WashType.destroy({
      where: { id: id },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: "Wash Type was deleted successfully!",
          });
        } else {
          res.send({
            message: `Cannot delete Wash Type with id=${id}. Maybe Wash Type was not found!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Could not delete Wash Type with id=" + id,
        });
      });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    WashType.destroy({
      where: {},
      truncate: false,
    })
      .then((nums) => {
        res.send({ message: `${nums} Wash Types were deleted successfully!` });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all wash_types.",
        });
      });
};

exports.fncreate = async (name, desc) => {
  // Validate request
  // Validate request
  if (!name) {
    res.status(400).send({
      message: "name can not be empty!",
    });
    return;
  }

  if (!desc) {
    res.status(400).send({
      message: "desc can not be empty!",
    });
    return;
  }

  var condition = {
    name: name,
  };

  const chk = await WashType.findAll({ where: condition });
  if (chk.length > 0) {
    res.status(401).send({
      message: "Already have prices!",
    });
    return;
  }

  // Create a Tutorial
  const washType = {
    name: name,
    desc: desc,
  };

  // Save Tutorial in the database
  const result = await WashType.create(washType);
  if (result === null) {
    console.log("Not found!");
    return [];
  } else {
    return result;
  }
};

exports.findByName = async (name) => {
  const result = await WashType.findAll({ where: { name: name } });
  return result;
};
