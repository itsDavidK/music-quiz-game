const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Score extends Model { }

Score.init(
    {
        score: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
    }
);

module.exports = Score;