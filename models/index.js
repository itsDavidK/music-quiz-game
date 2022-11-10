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

User.hasOne(Profile)

Profile.belongsTo(User)

User.hasMany(Score)

Score.belongsTo(User)

User.hasMany(Quiz, {
    onDelete: 'CASCADE'
})

Quiz.belongsTo(User, {
    onDelete: 'CASCADE'
})

Score.hasOne(Quiz, {
    onDelete: 'CASCADE'
})

Quiz.belongsTo(Score, {
    onDelete: 'CASCADE'
})

module.exports = { Question, Quiz, Score, User, Profile }