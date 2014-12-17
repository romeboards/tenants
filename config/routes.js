var async = require('async');

module.exports = function(app) {

  //Home route
  var index = require('../app/controllers/index');
  var bldings = require('../app/routes/blding');
  var geocoder = require('../app/routes/geocoder');

  app.get('/', index.render);

  app.get('/api/blding/taxes/:addr', bldings.findTaxes());
  app.get('/api/blding/bbl/:addr', bldings.findBBL());
  app.get('/api/blding/addr/:boro/:block/:lot', bldings.findAddr());
  app.get('/api/geocode/:addr', geocoder.geocode());
};