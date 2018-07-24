const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://@localhost:27017/TodoApp', {useNewUrlParser: true}, (err, client) => {
	if(err){
		return console.log('Unable to connect to MongoDB server');
	};
	console.log('Connected to MongoDB server');
	
	const db = client.db('TodoApp');

	db.collection('Users').find({name: 'Felix'}).toArray().then((docs) => {
		console.log('Filtered users');
		console.log(JSON.stringify(docs, undefined, 2));
	}, (err) => {
		console.log('Unable to retrieve users');
	})


	db.collection('Todos').find()
	// .toArray().then((docs) => {
	// 	console.log('Todos');
	// 	console.log(JSON.stringify(docs, undefined, 2));
	// }, (err) => {
	// 	console.log('Unable to fetch todos', err);
	// })
	.count().then((count) => {
		console.log(`Todos count: ${count}`);
	}, (err) => {
		console.log('Unable to cound todos');
	})
	;

client.close();
});