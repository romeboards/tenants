'use strict';

var request = require('request');

var dcp_geoclient = 'https://api.cityofnewyork.us/geoclient/v1/address.json';
var dcp_geoclient_id = '7e3b297d';
var dcp_geoclient_key = '21193e2a48e390e148263df4c5d77135';

exports.getGeosupport = function() {
  return function(req, res) {

    var street = req.params.street;
    var number = req.params.number;
    var params = {
        street: street,   
        houseNumber: number, 
        borough: 'brooklyn',
        app_id: dcp_geoclient_id,
        app_key: dcp_geoclient_key  
    };


    request({url:dcp_geoclient, qs:params}, function (error, response, body) {
      if (error) console.log(error);
      if (!error && response.statusCode == 200) {
        res.json(JSON.parse(body).address);
      }

    });
  }
};

//removes leading zeros
exports.getGeosupportBBL = function() {
  return function(req, res) {

    var street = req.params.street;
    var number = req.params.number;
    var params = {
        street: street,   
        houseNumber: number, 
        borough: 'brooklyn',
        app_id: dcp_geoclient_id,
        app_key: dcp_geoclient_key  
    };


    request({url:dcp_geoclient, qs:params}, function (error, response, body) {
      if (error) console.log(error);
      if (!error && response.statusCode == 200) {
        var json = JSON.parse(body).address;
        res.json({
          "bbl" : json.bbl,
          "boro" : json.bblBoroughCode.replace(/^0+/, ''),
          "block" : json.bblTaxBlock.replace(/^0+/, ''),
          "lot" : json.bblTaxLot.replace(/^0+/, '')
        });
      }

    });
  }
};