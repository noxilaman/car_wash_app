module.exports = (sequelize: any, Sequelize: any) => {
  const Price = sequelize.define("prices", {
    shop_id: {
      type: Sequelize.INTEGER,
    },
    wash_type_id: {
      type: Sequelize.INTEGER,
    },
    car_size_id: {
      type: Sequelize.INTEGER,
    },
    price: {
      type: Sequelize.FLOAT,
    },
  });
  
  Price.seq = sequelize;
  return Price;
};