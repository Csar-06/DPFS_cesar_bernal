module.exports = (sequelize, DataTypes) => {
    const Product = sequelize.define('Product', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        brand_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        model_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        image: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        render: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        unit_price: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        }
    }, {
        tableName: 'PRODUCTS',
        timestamps: false
    });

    Product.associate = models => {
        Product.belongsTo(models.Brand, { foreignKey: 'brand_id' });
        Product.belongsTo(models.Model, { foreignKey: 'model_id' });
        Product.hasMany(models.ProductColor, { foreignKey: 'product_id' });
    };

    return Product;
};
