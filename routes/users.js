var express = require('express');
var router = express.Router();

// link to the Account model
var Account = require('../models/account');

// auth check
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  }
  else {
    res.redirect('/login');
  }
}

/* GET users listing. */
router.get('/', isLoggedIn, function(req, res, next) {
  // use the Account model to query the db for user data
  Account.find(function(err, accounts) {
    if (err) {
      console.log(err);
      res.render('error');
    }
    else {
      // load the accounts  page and pass the query result
      res.render('users', {
        title: 'List of users',
        accounts: accounts,
        user: req.user
      });
    }
  });
});

module.exports = router;
