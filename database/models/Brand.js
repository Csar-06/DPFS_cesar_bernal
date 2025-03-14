module.exports = (sequelize, DataTypes) => {
    const Brand = sequelize.define('Brand', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        brand_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        }
    }, {
        tableName: 'BRANDS',
        timestamps: false
    });

    Brand.associate = models => {
        Brand.hasMany(models.Product, { foreignKey: 'brand_id' });
    };

    return Brand;
};
