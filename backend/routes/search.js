var express = require('express');
var router = express.Router();
const getDb = require('../db').getDb;

// POST /search gets JSON bodies
router.post('/search', function (req, res, next) {
  const db = getDb();

  data = db.city(req.body.ip);

  res.status(200).json({
    data: data,
    ip: req.body.ip,
  });
})

module.exports = router;
