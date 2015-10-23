var express = require('express'),
  router = express.Router();
Clinic = require('../models/clinic.js');

router.post('/create', function(req, res) {
  console.log(req.body)
  var clinic = new Clinic({
    name: req.body.name
  });
  clinic.save(function(err) {
    if (err) {
      return res.status(500).json({
        err: err
      });
    } else {
      return res.status(200).json("Clinic created!");
    }
  });
});
router.get('/all', function(req, res) {
  console.log(req);
  Clinic.find(function(err, clinics) {
    if (err) res.send(err);
    res.json(clinics);
  });
});

module.exports = router;
