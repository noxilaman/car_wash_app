module.exports = (sequelize: any, Sequelize: any) => {
  const UserShop = sequelize.define("user_shops", {
    user_id: {
      type: Sequelize.INTEGER,
    },
    shop_id: {
      type: Sequelize.INTEGER,
    },
  });

  UserShop.seq = sequelize;
  return UserShop;
};
