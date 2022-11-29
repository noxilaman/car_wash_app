require("dotenv").config();
const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Create and Save a new Tutorial
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.license_code) {
    res.status(400).send({
      message: "license_code can not be empty!",
    });
    return;
  }

  if (!req.body.city) {
    res.status(400).send({
      message: "city can not be empty!",
    });
    return;
  }

  if (!req.body.car_size_id) {
    res.status(400).send({
      message: "Car size can not be empty!",
    });
    return;
  }

  // Create a Tutorial
  const user = {
    license_code: req.body.license_code,
    city: req.body.city,
    car_size_id: req.body.car_size_id,
    note: req.body.note,
  };

  // Save Tutorial in the database
  await User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Car.",
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const license_code = req.query.license_code;
  var condition = license_code
    ? { license_code: { [Op.like]: `%${license_code}%` } }
    : null;

  User.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving cars.",
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Car with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Car with id=" + id,
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Car was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Car with id=${id}. Maybe Car was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Car with id=" + id,
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Car was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Car with id=${id}. Maybe Car was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Car with id=" + id,
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Cars were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all cars.",
      });
    });
};

exports.fncreate = async (fname, lname, mobile, email, password) => {
  // Validate request
  if (!fname) {
    res.status(400).send({
      message: "license_code can not be empty!",
    });
    return;
  }

  if (!lname) {
    res.status(400).send({
      message: "city can not be empty!",
    });
    return;
  }

  if (!mobile) {
    res.status(400).send({
      message: "Car size can not be empty!",
    });
    return;
  }

  if (!email) {
    res.status(400).send({
      message: "city can not be empty!",
    });
    return;
  }

  if (!password) {
    res.status(400).send({
      message: "Car size can not be empty!",
    });
    return;
  }

  // Create a Tutorial
  const user = {
    fname: fname,
    lname: lname,
    mobile: mobile,
    email: email,
    password: password,
  };

  // Save Tutorial in the database
  const result = await User.create(user);
  if (result === null) {
    console.log("Not found!");
    return [];
  } else {
    return result;
  }
};

// Update a Tutorial by the id in the request
exports.gentoken = async (req, res) => {
  try {
    const id = req.body.id;
    const token = req.body.token;

    const myuser = await User.findByPk(id);

    myuser.status = token;

    myuser.save();

    res.status(200).send("done");
  } catch (error) {
    res.status(404).send();
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate request
    if (!email) {
      res.status(400).send({
        message: "Email can not be empty!",
      });
      return;
    }

    if (!password) {
      res.status(400).send({
        message: "Password can not be empty!",
      });
      return;
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { id: user.id, email },
        process.env.JWT_TOKEN_KEY,
        { expiresIn: "2h"}
      );

      user.token  = token;
      await user.save();
      return res.status(200).json(user);
    }

    return res.status(400).send("login fail");
  } catch (error) {
    console.log(error);
  }
};