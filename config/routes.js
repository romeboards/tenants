var async = require('async');

module.exports = function(app) {

    //Home route
    var index = require('../app/controllers/index');


	var bldings = require('../app/routes/blding');
	// var boards = require('../app/routes/board');

	//console.log('hello?', bldings);

    app.get('/', index.render);

    app.get('/blding/find/:addr', bldings.findBlding());
	app.get('/blding/taxes/:addr', bldings.findTaxes());
	app.get('/blding/registrations/:addr', bldings.findRegistrations());
	app.get('/blding/contacts/:addr', bldings.findContacts());
};