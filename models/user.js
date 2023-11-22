const { Model, DataTypes } = require('sequelize');
const db = require('../config/connection');
const { hash, compare } = require('bcrypt');
const Vent = require('./Vent');

class User extends Model { }

User.init({
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            args: true,
            msg: 'Email address already in use!'
        validate: {
            isEmail: true,
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [8],
                msg: 'Password must be at least 8 characters long.'
            }
        }
    }
}, {
    modelName: 'user',
    sequelize: db,
    hooks: {
        async beforeCreate(User) {
            User.password = await hash(User.password, 10);
            return User;
        }
        }
    }
});

User.prototype.validatePassword = async function (form_password) {
    const is_valid = await compare(form_password, this.password);

    return is_valid;
}

User.hasMany(Vent, { as: 'vents', foreignKey: 'user_id' });
Vent.belongsTo(User, { foreignKey: 'user_id' });

module.exports = User;