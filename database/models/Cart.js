module.exports = (sequelize, DataTypes) => {
    const Cart = sequelize.define('Cart', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantity:{
            type: DataTypes.INTEGER,
            allowNull: false,
            default: 1,
        },
        added_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: 'CART',//nombre de la tabla en la DB.
        timestamps: true, //si en la tabla se encuentran los campos created_at/updated_at.
        underscored: true //vigila que haya "_".
    });

    Cart.associate = models => {
        Cart.belongsTo(models.User, { foreignKey: 'user_id' });
        Cart.hasMany(models.ProductCart, { foreignKey: 'cart_id' });
    };

    return Cart;
};
