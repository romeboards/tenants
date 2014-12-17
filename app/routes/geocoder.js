'use strict';

var geocoderProvider = 'google';
var httpAdapter = 'https';
// optionnal
var extra = {
  //clientId: '198347924247-t3ko6enq3udurdrii2u36ih1kr6fmv4k.apps.googleusercontent.com',
  apiKey: 'AIzaSyCHdkm54y-qEn2JD74BBH2LiTdKDZ4yR5Y', // for google maps (not in use)
  formatter: null         // 'gpx', 'string', ...
};

var geocoder = require('node-geocoder').getGeocoder(geocoderProvider, httpAdapter, extra);

exports.geocode = function() {
  return function(req, res) {

    var _addr = req.params.addr;
    console.log('TRYING', _addr);
    geocoder.geocode(_addr, function(err, _res) {
      if(err) console.log(err, _addr);
      else {
        console.log('RETURNING', _res[0].streetNumber + ' ' + _res[0].streetName);
        res.json(_res);
      }
    });
  }
};