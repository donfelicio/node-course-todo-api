const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		minlength: 1,
		trim: true, 
		require: true,
		unique: true,
		validate: {
			validator: (v) => {
				validator: validator.isEmail
			}, 	
			message: props => `${props.value} is not a valid phone email!`
		}
	},
	password: {
		type: String,
		require: true,
		minlength: 6
	},
	tokens: [{
		access: {
			type: String,
			require: true
		},
		token: {
			type: String,
			require: true
		}
	}]
});

//we are adding to the userSchema methods. 
//We made this schema and use it in creating the model, 
//since you can't add methods to the User model. 
//we are using the old function because it uses 'this'

userSchema.methods.generateAuthToken = function () {
	var user = this;
	var access = 'Auth';
	var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

	user.tokens = user.tokens.concat([{access, token}]);
	
	return user.save().then(() => {
		return token;
	});
};

userSchema.methods.toJSON = function () {
	var user = this;
	var userObject = user.toObject();

	return _.pick(userObject, ['_id', 'email']);
};

var User = mongoose.model('User', userSchema);

module.exports = {User};