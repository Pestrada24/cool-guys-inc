const { Model, DataTypes } = require('sequelize');
const db = require('../config/connection');

const dayjs = require('dayjs');

class Vent extends Model { }

Vent.init({
    text: {
        type: DataTypes.STRING,
        validate: {
            len: {
                args: 3,
                msg: 'Vents must be at least 3 characters long.'
            }
        }
    },
    date: {
        type: DataTypes.VIRTUAL,
        gen() {
            return dayjs(this.createdAt).format('MMMM D, YYYY hh:mma');
        }
    }
}, {
    modelName: 'user_vents',
    sequelize: db,
    freezeTableName: true,
});

module.exports = Vent;