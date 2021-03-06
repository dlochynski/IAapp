var express = require('express'),
  router = express.Router(),
  passport = require('passport');
var User = require('../models/user.js');


router.post('/register', function(req, res) {
  var role = req.body.doctor ? 'Doctor': 'User';
  User.register(new User({
    username: req.body.username,
    role: role,
    active: req.body.doctor
  }), req.body.password, function(err, account) {
    if (err) {
      return res.status(500).json({
        err: err
      })
    }
    passport.authenticate('local')(req, res, function() {
      return res.status(200).json({
        status: 'Registration successful!'
      })
    });
  });
});

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err)
    }
    if (!user.active) return res.status(401).json({
      err: "Wait for your account to be activated"
    })
    if (!user) {
      return res.status(401).json({
        err: info
      })
    }
    req.logIn(user, function(err) {
      if (err) {
        return res.status(500).json({
          err: 'Could not log in user'
        })
      }
      res.status(200).json({
        status: 'Login successful!', 
        user: user
      })
    });
  })(req, res, next);
});

router.get('/logout', function(req, res) {
  req.logout();
  res.status(200).json({
    status: 'Bye!'
  })
});

router.get('/all', function(req, res) {
  User.find(function(err, users) {
    if (err) res.send(err);
    users = users.filter(function(element) {
      if (element.role === 'User' && !element.active) return element;
    });
    res.json(users);
  })
});
router.put('/activate', function(req, res) {
  if (!req.body.username) return res.status(500).json({
    err: "No username given"
  });
  User.update({
    username: req.body.username
  }, {
    $set: {
      active: true
    }
  }, function(err) {
    if (err) {
      return res.status(500).json({
        err: "Cant set user active"
      });
    }
    res.status(200).json({
      status: "Update successful"
    });
  });
});

router.get('/allDoctors', function(req, res) {
  User.find(function(err, users) {
    if (err) res.send(err);
    users = users.filter(function(element) {
      if (element.role === 'Doctor') return element;
    });
    res.status(200).json(users);
  })
});

router.get('/:id',function(req, res) {
  User.findOne({_id: req.params.id},function(err, user) {
     if (err) res.status(500).send(err);
      res.status(200).json(user);
  });
})

module.exports = router;
