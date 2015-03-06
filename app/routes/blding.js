'use strict';

// eventually going to move this to ACRIS
exports.findTaxes = function() {
	return function(req, res) {

		var _addr = req.params.addr;
		var db = req.db;

		db.collection('avroll').find({ STADDR : _addr }).toArray(function (err, items) {
		   res.json(items);
		});
	}
};


// this is defunct, switching to just using Geoclient API clientside
exports.findBBL = function() {
	return function(req, res) {

		var _addr = req.params.addr;
		var db = req.db;

		db.collection('blocklot').find({ addr : _addr }).toArray(function (err, items) {
		   res.json(items);
		});
	}
};

// this is defunct, switching to just using Geoclient API clientside
exports.findAddr = function() {
  return function(req, res) {

    var _boro = req.params.boro;
    var _block = req.params.block;
    var _lot = req.params.lot;
    var db = req.db;

    db.collection('blocklot').find({ boro : _boro, block : _block, lot : _lot }).toArray(function (err, items) {
       res.json(items);
    });
  }
};

exports.findDHCR = function() {
  return function(req, res) {

    var _boro = req.params.boro;
    var _block = req.params.block;
    var _lot = req.params.lot;
    var db = req.db;

    // just starting with brooklyn
   // db.collection('dhcr').find({ boro : _boro, block : _block, lot : _lot }).toArray(function (err, items) {
    db.collection('dhcr').find({ BLOCK : _block, LOT : _lot }).toArray(function (err, items) {
       res.json(items);
    });
  }
};

exports.findHPDViolations = function() {
  return function(req, res) {

    var _boro = req.params.boro;
    var _block = req.params.block;
    var _lot = req.params.lot;
    var db = req.db;

    db.collection('hpdviolations').find({ BoroID : _boro, Block : _block, Lot : _lot }).toArray(function (err, items) {
       res.json(items);
    });
  }
};

exports.findHPDComplaints = function() {
  return function(req, res) {

    var _boro = req.params.boro;
    var _block = req.params.block;
    var _lot = req.params.lot;
    var db = req.db;

    db.collection('hpdcomplaints').find({ BoroughID : _boro, Block : _block, Lot : _lot }).toArray(function (err, items) {
       res.json(items);
    });
  }
};
