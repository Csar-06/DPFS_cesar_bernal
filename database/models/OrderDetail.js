module.exports = (sequelize, DataTypes) => {
    const OrderDetail = sequelize.define('OrderDetail', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        order_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        unit_price: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        }
    }, {
        tableName: 'ORDERS_DETAILS',
        timestamps: false
    });

    OrderDetail.associate = models => {
        OrderDetail.belongsTo(models.Order, { foreignKey: 'order_id' });
        OrderDetail.belongsTo(models.Product, { foreignKey: 'product_id' });
    };

    return OrderDetail;
};
