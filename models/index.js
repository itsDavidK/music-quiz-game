const Question = require('./Question')
const Quiz = require('./Quiz')
const Score = require('./Score')
const User = require('./User')
const Profile = require('./Profile')

Quiz.hasMany(Question, {
    onDelete: 'CASCADE'
})

Question.belongsTo(Quiz, {
    onDelete: 'CASCADE'
})

User.hasOne(Profile, {
    onDelete: 'CASCADE'
})

Profile.belongsTo(User, {
    onDelete: 'CASCADE'
})

User.hasMany(Score, {
    onDelete: 'CASCADE'
})

Score.belongsTo(User, {
    onDelete: 'CASCADE'
})

User.hasMany(Quiz, {
    onDelete: 'CASCADE'
})

Quiz.belongsTo(User, {
    onDelete: 'CASCADE'
})

Quiz.hasMany(Score, {
    onDelete: 'CASCADE'
})

Score.belongsTo(Quiz, {
    onDelete: 'CASCADE'
})

module.exports = { Question, Quiz, Score, User, Profile }