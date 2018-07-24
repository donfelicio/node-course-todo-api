//const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

//example of using functions in methods with destructuring (see example below)
// var obj = new ObjectID();
// console.log(obj);

//destructuring, making a new var out of an object
// var user = {name:'Felix', age:25};
// var {name} = user;
// console.log(name);

MongoClient.connect('mongodb://@localhost:27017/TodoApp', {useNewUrlParser: true}, (err, client) => {
	if(err){
		return console.log('Unable to connect to MongoDB server');
	};
	console.log('Connected to MongoDB server');
	
	// const db = client.db('TodoApp');

	// db.collection('Todos').insertOne({
	// 	text: 'Something to do',
	// 	completed: false
	// }, (err, result) => {
	// 	if (err) {
	// 		return console.log('Unable to insert todo', err);
	// 	}

	// 	console.log(JSON.stringify(result.ops, undefined, 2));
	// });

	//insert new doc into Users collection {name, age, location}

// 	db.collection('Users').insertOne({
// 		//_id: 123,
// 		name: 'Felix',
// 		age: 34, 
// 		location: 'Amsterdam'
// 	}, (err, result) => {
// 		if(err){
// 			return console.log('Unable to create user');
// 		}
// 		console.log('Succesfully created user', JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2));
// 	})
client.close();
});