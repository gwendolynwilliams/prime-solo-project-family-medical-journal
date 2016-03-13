var express = require('express');
var router = express.Router();
var passport = require('passport');

// Handles login form POST from login
router.post('/',
    passport.authenticate('local', {
        successRedirect: '/views/success.html',
        failureRedirect: '/views/failure.html'
    })
);

module.exports = router;