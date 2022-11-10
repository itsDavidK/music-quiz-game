const express = require('express');
const router = express.Router();
const { User, Profile } = require('../../models');


router.get('/', (req, res) => {
    Profile.findAll({
        include: [User]
    }).then(allUser =>
        res.json(allUser)
    )
})

router.post('/create', (req, res) => {
    Profile.create({
        userRight: req.body.userRight,
        userWrong: req.body.userWrong,
        totalGame: req.body.totalGame,
        UserId: req.session.userInfo.id
    }).then(data => {
        res.status(200).json(data)
    }).catch(err => {
        console.log(err);
        res.status(500).json({ err: err })
    })
})

router.put('/update', async (req, res) => {
    if (!req.session.userInfo) {
        return res.redirect('/login')
    }
    Profile.update({
        userRight: req.body.userRight,
        userWrong: req.body.userWrong,
        totalGame: req.body.totalGame
    },
        {
            where: {
                UserId: req.session.userInfo.id
            }
        }).then(data => {
            res.json(data);
        }).catch(err => {
            console.log(err);
            res.status(500).json({ err: err })
        })
});

module.exports = router; 