const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user')

// var id = '5b72bbaeba927f6f209c9d5b11';
var id = '5b728bfb604b795f01ba1206';

// if (!ObjectID.isValid(id)){
// 	console.log('ID not valid');
// };

// Todo.find({
// 	_id: id
// }).then((todos) => {
// 	console.log('Todos', todos);
// });

// Todo.findOne({
// 	_id: id
// }).then((todo) => {
// 	console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
// 	if(!todo){
// 		return console.log('Id not found');
// 	}
// 	console.log('Todo by ID', todo);
// }).catch((e) => console.log(e));

User.findById(id).then((user) => {
	if(!user){
		return console.log('No user found');
	}
	console.log('User found', user);
}).catch((e) => {
	if (!ObjectID.isValid(id)){
	return console.log('ID not valid');
}
});