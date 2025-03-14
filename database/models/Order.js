module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        total_price: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        },
        status: {
            type: DataTypes.STRING(50),
            allowNull: false
        }
    }, {
        tableName: 'ORDERS',//nombre de la tabla en la DB.
        timestamps: true, //si en la tabla se encuentran los campos created_at/updated_at.
        underscored: true //vigila que haya "_".
    });

    Order.associate = models => {
        Order.belongsTo(models.User, { foreignKey: 'user_id' });
        Order.hasMany(models.OrderDetail, { foreignKey: 'order_id' });
    };

    return Order;
};
