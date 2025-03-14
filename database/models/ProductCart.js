module.exports = (sequelize, DataTypes) => {
    const ProductCart = sequelize.define('ProductCart', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        cart_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        }
    }, {
        tableName: 'PRODUCT_CART',
        timestamps: false
    });

    ProductCart.associate = models => {
        ProductCart.belongsTo(models.Cart, { foreignKey: 'cart_id' });
        ProductCart.belongsTo(models.ProductColor, { foreignKey: 'product_id' });
    };

    return ProductCart;
};
