module.exports = (sequelize, DataTypes) => {
    const UserRole = sequelize.define('UserRole', {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'USER',
                key: 'id'
            }
        },
        role_id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            references: {
                model: 'ROLE',
                key: 'id'
            }
        },
    }, {
        tableName: 'USER_ROLES', //nombre de la tabla en la DB.
        timestamps: true, //si en la tabla se encuentran los campos created_at/updated_at.
        underscored: true, //vigila que haya "_".
    });

    UserRole.associate = models => {
        UserRole.belongsTo(models.User, { foreignKey: 'user_id' });
        // UserRole.belongsTo(models.User, {foreignKey: 'user_id'});
        UserRole.belongsTo(models.Role, { foreignKey: 'role_id' });
        // UserRole.belongsTo(models.Role, {foreignKey: 'role_id'});
    };

    return UserRole;
};
