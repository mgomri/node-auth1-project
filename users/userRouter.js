const express = require('express');

const Users = require('./userConfig.js');

const router = express.Router();
const bcrypt = require('bcrypt');


router.post('/register', (req, res) => {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;
    Users.add(user)
        .then(us => {
            res.status(201).json(us);
        })
        .catch(err => {
            res.status(500).json({ message: `Failed to get the users`})
        });

});

router.get('/users', restricted, (req, res) => {
    Users.find()
        .then(user => {
            res.status(200).json(user);
        })
        .catch(err => {
            res.status(500).json({ message: `Unable to get users`});
        })
});

router.post('/login', (req, res) =>{
    let { username, password } = req.body;
    
    Users.findBy({ username })
        .first()
        .then(user => {
            if(user && bcrypt.compareSync(password, user.password)){
                req.session.user = user;
                res.status(200).json({ message:`welcome ${user.username}`});
            }else {
                res.status(401).json({ message: 'Invalid Credentials'});
            }
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.get('/logout', (req, res) => {
    if(req.session){
        req.session.destroy(err => {
            if(err){
                res.json({message: 'you gonna stay logged in forever muhahaha'});
            }else{
                res.status(200).json({ message: 'goodbye my friend'})
            }
        })
    }else{
        res.status(200).json({ message: 'you were never here'});
    }
})

function restricted(req, res, next) {
    if (req.session && req.session.user) {
      next();
    } else {
      res.status(401).json({ you: "cannot pass!" });
    }
  }
module.exports = router;