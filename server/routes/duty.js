var express = require('express'),
  router = express.Router();
var Duty = require('../models/duty.js');

router.post('/create', function(req, res) {
  console.log(req.body);
  var duty = new Duty({
    doctorId: req.body.doctorId,
    clinicId: req.body.clinicId,
    day: req.body.day,
    hourStart: req.body.hourStart,
    hourEnd: req.body.hourEnd
  });
  duty.save(function(err) {
    if (err) {
      return res.status(500).json({
        err: err
      });
    } else {
      return res.status(200).json("Duty created!");
    }
  });
});

router.get('/doctor/:id', function(req, res) {
    Duty.find({
      doctorId: req.params.id
    }, function(err, duties) {
      if (err) {
        return res.status(500).json({
          err: err
        });
      } else {
        return res.status(200).json(duties);
      }
    });
  });

router.get('/clinic/:id', function(req, res) {
    Duty.find({
      clinicId: req.params.id
    }, function(err, duties) {
      if (err) {
        return res.status(500).json({
          err: err
        });
      } else {
        return res.status(200).json(duties);
      }
    });
  });

module.exports = router;
