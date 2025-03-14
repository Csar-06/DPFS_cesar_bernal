module.exports = (sequelize, DataTypes) => {
    const Model = sequelize.define('Model', {
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
        model: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    }, {
        tableName: 'MODELS',
        timestamps: false
    });

    Model.associate = models => {
        Model.belongsTo(models.Brand, { foreignKey: 'brand_id' });
        Model.hasMany(models.Product, { foreignKey: 'model_id' });
    };

    return Model;
};
