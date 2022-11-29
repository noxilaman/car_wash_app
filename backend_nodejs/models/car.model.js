module.exports = (sequelize, Sequelize) => {
  const Car = sequelize.define("cars", {
    license_code: {
      type: Sequelize.STRING,
    },
    city: {
      type: Sequelize.STRING,
    },
    car_size_id: {
      type: Sequelize.INTEGER,
    },
    note: {
      type: Sequelize.TEXT,
    },
  });

  return Car;
};