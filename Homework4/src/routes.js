const router = require('express').Router();


const  follows = require('./data/follows');
const  howls = require('./data/howls');
const  users = require('./data/users');


// Get all users
router.get('/users', (req, res) => {
    res.json(Object.values(users));
  });

// Get user by id
router.get('/users/:id', (req, res) => {
    const user = users[req.params.id];

    if (user) {
        res.json(user);
    }
    else {
        res.status(404).json({error: "User not found"});
    }
  });

// Get specific user by username
router.get('/users/:username', (req, res) => {
    let flag = false;
    let user = null;
    for (let i = 1; i <= Object.keys(users).length; i++) {
        if (req.params.username == users[i].username) {
            user = users[i];
            flag = true;
        }
    }
    if(flag) {
      res.json(user);
    }
    else {
      res.status(404).json({error: "User not found"});
    }  
});

// Get all howls by user id
router.get('/howls/:userId', (req, res) => {
    let howlsArr = [];
    for (let i = 0; i < Object.keys(howls).length; i++) {
        if (howls[i].userId == req.params.userId) {
            howlsArr.push(howls[i]);
        }
    }
    res.json(howlsArr);
});

//Get users followed by userId
router.get('/follows/:userId', (req, res) => {
    let userFollows = follows[req.params.userId].following;
    res.json(userFollows);
});




module.exports = router;