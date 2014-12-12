'use strict';

exports.findBlding = function() {
	return function(req, res) {
		// var _addr = req.params.addr;
		// db.collection('threeoneone').find({ addr : _addr }).toArray(function (err, items) {
		//    res.json(items);
		// });
	}
};

exports.findTaxes = function() {
	return function(req, res) {

		var _addr = req.params.addr;
		var db = req.db;

		db.collection('avroll').find({ STADDR : _addr }).toArray(function (err, items) {
		   res.json(items);
		});
	}
};

exports.findRegistrations = function() {
	return function(req, res) {

		var _addr = req.params.addr;
		var db = req.db;

		db.collection('avroll').find({ STADDR : _addr }).toArray(function (err, items) {
		   res.json(items);
		});
	}
};

exports.findContacts = function() {
	return function(req, res) {

		var _addr = req.params.addr;
		var db = req.db;

		db.collection('avroll').find({ STADDR : _addr }).toArray(function (err, items) {
		   res.json(items);
		});
	}
};
