var async = require('async');

module.exports = function(app) {

  //Home route
  var index = require('../app/controllers/index');
  var bldings = require('../app/routes/blding');
  var geocoder = require('../app/routes/geocoder');
  var geoclient = require('../app/routes/geoclient');

  app.get('/', index.render);

  app.get('/api/blding/taxes/:addr', bldings.findTaxes());
  app.get('/api/blding/addr/:boro/:block/:lot', bldings.findAddr());
  app.get('/api/blding/dhcr/:boro/:block/:lot', bldings.findDHCR());
  app.get('/api/blding/hpdviolations/:boro/:block/:lot', bldings.findHPDViolations());
  app.get('/api/blding/hpdcomplaints/:boro/:block/:lot', bldings.findHPDComplaints());
  app.get('/api/geocode/:addr', geocoder.geocode());
  app.get('/api/geoclient/:number/:street', geoclient.getGeosupport());
  app.get('/api/geoclient/bbl/:number/:street', geoclient.getGeosupportBBL());  
};