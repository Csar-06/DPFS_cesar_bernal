module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('Role', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        role_name: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        }
    }, {
        tableName: 'ROLES',
        timestamps: false
    });

    Role.associate = models => {
        Role.belongsToMany(models.User, { through: models.UserRole, foreignKey: 'role_id' });
    };

    return Role;
};
