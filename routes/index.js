const express = require('express');
const router = express.Router();
const xml = require('xml');
import {covid19ImpactEstimator} from '../src/estimator';

let data = [];

router.post('/api/v1/on-covid-19', function(req, res, next) {
  const input = req.body;

  data.push(input);
  res.json(input);
});

router.get('/api/v1/on-covid-19/json', function(req, res, next) {
  res.json(data);
});

router.get('/api/v1/on-covid-19/xml', function(req, res, next) {
  res.set('Content-Type', 'text/xml');

  let newData = [];

  newData = data;
  newData = xml(JSON.stringify(data));

  res.send(newData);
});

router.get('/api/v1/on-covid-19/logs', function(req, res, next) {
  // ** tasks **
  // use morgan with this route.
  // save log after calling 3 times.
  res.send('stream');
});

module.exports = router;