var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user')

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
	var todo = new Todo({
		text: req.body.text
	});

	todo.save().then((doc) => {
		res.send(doc);
	},(e) => {
		res.status(400).send(e);
	})
});

app.listen(3000, () => {
	console.log('Started on port 3000');
});

module.exports = {app};

//Create model in models folder, and save item into it

// var user = new User({
// 	email: 'felix@donfelicio.com'
// });

// user.save().then((doc) => {
// 	console.log('User created', doc)
// },(e) => {
// 	console.log('User could not be created', e)
// });
