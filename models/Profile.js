const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Profile extends Model { }

Profile.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
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
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id',
            },
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'profile',
    }
);

module.exports = Profile;