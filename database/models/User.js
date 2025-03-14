module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        first_name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        join_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        avatar: {
            type: DataTypes.STRING(255),
            allowNull: true
        }
    }, {
        tableName: 'USERS',
        timestamps: false
    });

    User.associate = models => {
        User.belongsToMany(models.Role, { through: models.UserRole, foreignKey: 'user_id' });
        User.hasMany(models.Cart, { foreignKey: 'user_id' });
        User.hasMany(models.Order, { foreignKey: 'user_id' });
    };

    return User;
};
