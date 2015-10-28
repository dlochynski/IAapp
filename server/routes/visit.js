var express = require('express'),
  router = express.Router();
var Visit = require('../models/visit.js');

router.post('/create', function(req, res) {
  console.log(req.body);
  var visit = new Visit({
    hour: req.body.hour,
    clinicId: req.body.clinicId,
    doctorId: req.body.doctorId,
    userId: req.body.userId
  });
  visit.save(function(err) {
    if (err) {
      return res.status(500).json({
        err: err
      });
    } else {
      return res.status(200).json("Visit created!");
    }
  });
});
module.exports = router;
