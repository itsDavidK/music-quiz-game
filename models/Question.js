const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Question extends Model { }

Question.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        URL: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        quiz_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'quiz',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'question',
    }
);

module.exports = Question;