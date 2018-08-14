const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user')

// Todo.remove({}).then((result) => {
// 	console.log(result);
// });

// Todo.findOneAndRemove({}).then((doc) => {
// 	console.log(result);
// });

var id = '5b72e9bd1365ea7243297548';

Todo.findByIdAndRemove(id).then((doc) => {
	console.log(doc);
});