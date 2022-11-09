const Question = require('./Question')
const Quiz = require('./Quiz')
const Score = require('./Score')
const User = require('./User')

Quiz.hasMany(Question, {
    foreignKey: 'quiz_id',
    onDelete: 'CASCADE'
})

Question.belongsTo(Quiz, {
    foreignKey: 'quiz_id',
    onDelete: 'CASCADE'
})

User.hasMany(Score, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

Score.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

User.hasMany(Quiz, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

Quiz.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
})

Score.hasOne(Quiz, {
    foreignKey: 'quiz_id',
    onDelete: 'CASCADE'
})

Quiz.belongsTo(Score, {
    foreignKey: 'quiz_id',
    onDelete: 'CASCADE'
})

module.exports = { Question, Quiz, Score, User }