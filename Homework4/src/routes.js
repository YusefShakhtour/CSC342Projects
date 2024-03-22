const express = require('express');
const router = require('express').Router();
const cookieParser = require('cookie-parser');

const  follows = require('./data/follows');
const  howls = require('./data/howls');
const  users = require('./data/users');

router.use(express.json());
router.use(cookieParser());
const {SessionMiddleware, initializeSession, removeSession} = require('./middleware/sessionCookieMiddleware');


// Get all users
router.get('/users', (req, res) => {
    res.json(users);
  });

// Get user by id
router.get('/users/:id', SessionMiddleware,(req, res) => {
    const user = users[req.params.id];

    if (user) {
        res.json(user);
    }
    else {
        res.status(404).json({error: "User not found"});
    }
  });

// Get specific user by username
router.get('/users/:username', SessionMiddleware, (req, res) => {
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
router.get('/howls/:userId', SessionMiddleware, (req, res) => {
    let howlsArr = [];
    for (let i = 0; i < Object.keys(howls).length; i++) {
        if (howls[i].userId == req.params.userId) {
            howlsArr.push(howls[i]);
        }
    }
    res.json(howlsArr);
});

//Get users followed by userId
router.get('/follows/:userId', SessionMiddleware, (req, res) => {
    let userFollows = follows[req.params.userId].following;
    res.json(userFollows);
});

router.get('profile/:userId', SessionMiddleware, (req, res) => {

})

//Posting a new howl
router.post('/howls/:userId', SessionMiddleware, (req, res) => {
    let newHowl = {
        id : howls.length,
        userId : req.body.userId,
        datetime : "2019-10-18T00:17:32Z",
        text : req.body.text
    };
    howls.push(newHowl);
    res.json(newHowl);
});

//Follow a user
router.put('/follow/:userId', SessionMiddleware, (req, res) => {
    [Object.values(follows)[req.session.user - 1]][0].following.push(req.params.userId)
    res.json("success");
});

//Unfollow a user
router.put('/unfollow/:userId', SessionMiddleware, (req, res) => {
    for (let i = 0; i < [Object.values(follows)[req.session.user - 1]][0].following.length; i++) {
        if ([Object.values(follows)[req.session.user - 1]][0].following[i] == req.params.userId) {
            [Object.values(follows)[req.session.user - 1]][0].following.splice(i, 1);
        }
    }
    res.json("success");
});



router.post('/login', (req, res) => {
    let flag = false;
    // console.log(users[Object.keys(users)[0]].username);
    // console.log(Object.keys(users).length);
    for (let i = 0; i < Object.keys(users).length; i++) {
        if (users[Object.keys(users)[i]].username == req.body.username) {
            initializeSession(req, res, Object.keys(users)[i]);
            flag = true;
        }
    }
    if (flag) {
        res.json("Success");
    }
    else {
        res.status(401).json({error: 'Not authenticated'});
    }
});

router.get('/logout', (req,  res) => {
    removeSession(req, res);
    res.json("Logout");
  });


module.exports = router;