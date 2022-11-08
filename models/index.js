const Question = require('./Question')
const Quiz = require('./Quiz')
const Score = require('./Score')
const User = require('./User')

Quiz.hasMany(Question, {
    foreignKey: 'quiz_id',
})

Question.belongsTo(Quiz, {
    foreignKey: 'quiz_id',
})

User.hasMany(Score, {
    foreignKey: 'user_id',
})

Score.belongsTo(User, {
    foreignKey: 'user_id',
})

User.hasMany(Quiz, {
    foreignKey: 'user_id',
})

Quiz.belongsTo(User, {
    foreignKey: 'user_id',
})

Score.hasOne(Quiz, {
    foreignKey: 'quiz_id',
})

Quiz.belongsTo(Score, {
    foreignKey: 'quiz_id',
})

module.exports = { Question, Quiz, Score, User }