module.exports = (sequelize, Sequelize) => {
  const CarSize = sequelize.define("car_sizes", {
    name: {
      type: Sequelize.STRING,
    },
    desc: {
      type: Sequelize.TEXT,
    },
  });

  return CarSize;
};