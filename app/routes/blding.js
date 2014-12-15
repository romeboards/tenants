'use strict';

exports.findTaxes = function() {
	return function(req, res) {

		var _addr = req.params.addr;
		var db = req.db;

		db.collection('avroll').find({ STADDR : _addr }).toArray(function (err, items) {
		   res.json(items);
		});
	}
};

exports.findBBL = function() {
	return function(req, res) {

		var _addr = req.params.addr;
		var db = req.db;

		db.collection('blocklot').find({ addr : _addr }).toArray(function (err, items) {
		   res.json(items);
		});
	}
};


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
