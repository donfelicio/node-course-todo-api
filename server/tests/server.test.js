const request = require('supertest');
const expect = require('expect');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos = [{
	_id: new ObjectID(),
	text: 'First test todo'
},{
	_id: new ObjectID(),
	text: 'Second test todo',
	completed: true,
	completedAt: 333
}];

beforeEach((done) => {
	Todo.remove({}).then(() => {
		return Todo.insertMany(todos);
	}).then(() => {
		done()
	});

});

describe('POST /todos', () => {
	it('should create a new todo', (done) => {
		var text = 'Test todo text';

		request(app)
		.post('/todos')
		.send({text})
		.expect(200)
		.expect((res) => {
			expect(res.body.text).toBe(text);
		})
		.end((err, res) => {
			if (err) {
				return done(err);
			}

			Todo.find({text}).then((todos) => {
				expect(todos.length).toBe(1);
				expect(todos[0].text).toBe(text);
				done();
			}).catch((e) => done(e));
		});
	});

	it('should not create todo with invalid body data', (done) => {
		request(app)
		.post('/todos')
		.send({})
		.expect(400)
		.end((err, res) => {
			if(err) {
				return done(err);
			}

			Todo.find().then((todos) => {
				expect(todos.length).toBe(2);
				done();
			}).catch((e) => done(e));
		});
	});
});

describe('GET /todos', () => {
	it('should get all todos', (done) =>{
		request(app)
		.get('/todos')
		.expect(200)
		.expect((res) => {
			expect(res.body.todos.length).toBe(2);
		})
		.end(done);
	});
});

describe('GET /todos/:id', () => {
	it('Should return todo doc', (done) => {
		request(app)
		.get(`/todos/${todos[0]._id.toHexString()}`)
		.expect(200)
		.expect((res) => {
			expect(res.body.todo.text).toBe(todos[0].text);
		})
			.end(done);
	});

	it('Should return a 404 if todo not found', (done) => {
		var hexId = new ObjectID().toHexString();
		request(app)
		.get(`/todos/${hexId}`)
		.expect(404)
			.end(done)
		//create new id and shouldnt match
		//make sure you get a 404 back
	});

	it('Should return a 404 for non-object ids', (done) => {
		//make sure you get 404 back
		var id = 'StringID';
		request(app)
		.get(`/todos/${id}`)
		.expect(404)
		.end(done)
	})
		
});

describe('DELETE /todos/:id', () => {
	it('Should remove a todo', (done) => {
		var hexId = todos[1]._id.toHexString();

		request(app)
		.delete(`/todos/${hexId}`)
		.expect(200)
		.expect((res) => {
			expect(res.body.todo._id).toBe(hexId);
		})
		.end((err, res) => {
			if(err){
				return done(err);
			}

			Todo.findById(hexId).then((todo) => {
				expect(todo).not.toBeTruthy();
				done();
			}).catch((e) => done(e));
		});
	});

	it('Should return 404 if todo not found', (done) => {
		var hexId = new ObjectID().toHexString();

		request(app)
		.delete(`/todos/${hexId}`)
		.expect(404)
			.end(done)
	});

	it('Should return 404 if ObjectID is invalid', (done) => {
	var id = 'StringID';
		request(app)
		.delete(`/todos/${id}`)
		.expect(404)
		.end(done)
	});
});

describe('PATCH /todos/:id', () => {
	it('Should update the todo', (done) => {
		var hexId = todos[1]._id.toHexString();
		var text = "changed text";
		var completed = true;

		request(app)
		.patch(`/todos/${hexId}`)
		.send({
			completed: true,
			text
		})
		.expect(200)
		.expect((res) => {
			expect(res.body.todo.text).toBe(text);
			expect(res.body.todo.completed).toBe(true);
			expect(typeof res.body.todo.completedAt).toBe('number');
		})
		.end(done)
		

		//grab id of first item
		//make patch request, provide url and send body
		//updat text (changed) and set completed to true
		//assert 200, custom: res.body = text is changed, toBeA number

	});
	it('Should clear completedAt when todo is not completed', (done) => {
		var hexId = todos[1]._id.toHexString();
		var text = "Changed text";
		request(app)
		.patch(`/todos/${hexId}`)
		.send({
			completed: false,
			text
		})
		.expect(200)
		.expect((res) => {
			expect(res.body.todo.text).toBe(text)
			expect(res.body.todo.completed).toBe(false)
			expect(res.body.todo.completedAt).toBeNull()
		})
		.end(done)
		//grab id of second todo
		//update text (change), completed = false
		//assert 200, body is change, completed = false, completedAt is null (.not.toBeTruthy())
	});
})

