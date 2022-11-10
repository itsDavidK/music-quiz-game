const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Profile extends Model { }

Profile.init(
    {
        userRight: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        userWrong: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        totalGame: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
    }
);

module.exports = Profile;