const router = require('express').Router();
const { Question, Quiz, Score, User } = require('../models');



router.post("/login", (req, res) => {
    User.findOne({
        where: {
            email: req.body.username
        }
    }).then(foundUser => {
        //wrong username
        if (!foundUser) {
            return res.status(401).json({ msg: "Invalid login credentials" })
        }
        //wrong password
        if (!bcrypt.compareSync(req.body.password, foundUser.password)) {
            return res.status(401).json({ msg: "Invalid login credentials" })
        }
        //correct login
        req.session.userInfo = {
            email: foundUser.email,
            id: foundUser.id
        }
        res.json(foundUser);
    })
})


module.exports = router;