const sequelize = require("../config/connection");
const { Question, Quiz, Score, User, Profile } = require("../models");

const seed = async ()=> {
    await sequelize.sync({force:true});
    const users = await User.bulkCreate([
        {
            username:"Kate",
            password:"password"
        },
        {
            username:"Dave90",
            password:"password1"
        },
        {
            username:"BootCamp2022",
            password:"password1!"
        }
    ],{
        individualHooks:true
    })
    const profile = await Profile.bulkCreate([
        {
            userRight: 18,
            userWrong: 12,
            totalGame: 3,
            UserId:1
        },
        {
            userRight: 240,
            userWrong: 8,
            totalGame: 2,
            UserId:2
        },
        {
            userRight: 14,
            userWrong: 19,
            totalGame: 3,
            UserId:3
        },
    ])
    const quiz = await Quiz.bulkCreate([
        {
            quiz_title: "example",
            UserId: 2
        },
    ])
    const question = await Question.bulkCreate([
        {
            URL: "https://www.youtube.com/watch?v=2bjGACO45DI",
            QuizId: 1
        },
        {
            URL: "https://www.youtube.com/watch?v=KN261fpFxF0",
            QuizId: 1
        },
        {
            URL: "https://www.youtube.com/watch?v=HYsz1hP0BFo",
            QuizId: 1
        },
        {
            URL: "https://www.youtube.com/watch?v=Uq9gPaIzbe8",
            QuizId: 1
        },
    ])
    const score = await Score.bulkCreate([
        {
            score: 10,
            UserId: 1,
            QuizId: null
        },
        {
            score: 2,
            UserId: 1,
            QuizId: 1,
        },
    ])
    console.log("seeded!")
    process.exit(0)
}

seed();