module.exports = function (sequelize, Sequelize) {
    var UserShop = sequelize.define("user_shops", {
        user_id: {
            type: Sequelize.INTEGER
        },
        shop_id: {
            type: Sequelize.INTEGER
        }
    });
    UserShop.seq = sequelize;
    return UserShop;
};
