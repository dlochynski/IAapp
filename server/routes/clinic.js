var express = require('express'),
  router = express.Router();
var Clinic = require('../models/clinic.js');

router.post('/create', function(req, res) {
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
  Clinic.find(function(err, clinics) {
    if (err) res.send(err);
    res.json(clinics);
  });
});

router.get('/:id',function(req, res) {
  Clinic.findOne({_id: req.params.id},function(err, clinic) {
     if (err) res.status(500).send(err);
      res.status(200).json(clinic);
  })
})
router.delete('/delete/:name', function(req, res) {
  Clinic.remove({
    name: req.params.name
  }, function(err) {
    if (err) return res.send(err);
    return res.status(200).json("Deleted");
  });
});
module.exports = router;
