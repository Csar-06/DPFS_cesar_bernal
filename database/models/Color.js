module.exports = (sequelize, DataTypes) => {
    const Color = sequelize.define('Color', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        color: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        }
    }, {
        tableName: 'COLORS',
        timestamps: false
    });

    Color.associate = models => {
        Color.hasMany(models.ProductColor, { foreignKey: 'color_id' });
    };

    return Color;
};
