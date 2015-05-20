/**
 * Created by taejun on 2015-05-20.
 */
var mongoose = require('mongoose');

// post 정보를 담기위한 MongoDB model

var postModel = function() {

	var PostSchema = mongoose.Schema({
		title: String,
		//sub: String,
		content: String,
		user: String,
		hits: Number,
		date: { type: Date, default: Date.now }
	});

	return mongoose.model('post', PostSchema);
};

module.exports = new postModel();

