module.exports = (sequelize, DataTypes) => {
    const ProductColor = sequelize.define('ProductColor', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        color_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'PRODUCT_COLOR',
        timestamps: false
    });

    ProductColor.associate = models => {
        ProductColor.belongsTo(models.Product, { foreignKey: 'product_id' });
        ProductColor.belongsTo(models.Color, { foreignKey: 'color_id' });
    };

    return ProductColor;
};
