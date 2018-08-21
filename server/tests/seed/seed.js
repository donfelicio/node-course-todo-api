const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} = require('./../../models/todo');
const {User} = require('./../../models/user');


const userOneId = new ObjectID();
const userTwoId = new ObjectID();
const users = [{
	_id: userOneId,
	email: 'felix@example.com',
	password: 'userOnepass',
	tokens: [{
		access: 'Auth',
		token: jwt.sign({_id: userOneId, access: 'Auth'}, process.env.JWT_SECRET).toString()
	}]
}, {
	_id: userTwoId,
	email: 'gen@example.com',
	password: 'userTwoPass',
	tokens: [{
		access: 'Auth',
		token: jwt.sign({_id: userTwoId, access: 'Auth'}, process.env.JWT_SECRET).toString()
	}]
}];

const todos = [{
	_id: new ObjectID(),
	text: 'First test todo',
	_createdBy: userOneId
},{
	_id: new ObjectID(),
	text: 'Second test todo',
	completed: true,
	completedAt: 333,
	_createdBy: userTwoId
}];

const populateTodos = (done) => {
	Todo.remove({}).then(() => {
		return Todo.insertMany(todos);
	}).then(() => {
		done()
	});
};

const populateUsers = (done) => {
	User.remove({}).then(() => {
		var userOne = new User(users[0]).save();
		var userTwo = new User(users[1]).save();

		return Promise.all([userOne, userTwo])
	}).then(() => done());
};

module.exports = {todos, populateTodos, users, populateUsers};
