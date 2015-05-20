/**
 * Created by taejun on 2015-05-20.
 */
var express = require('express');
var router = express.Router();
var PostModel = require('../models/post_model');

// POST to CREATE
router.post('/', function (req, res) {
	var post;
	console.log("POST: ");
	console.log(req.body);
	post = new PostModel({
		title: req.body.title,
		sub: req.body.sub,
		content: req.body.content,
		user: req.body.user,
		hits: req.body.hits
	});
	post.save(function (err) {
		if (!err) {
			return console.log("created");
		} else {
			return console.log(err);
		}
	});
	res.send(post);
});

// POST 전체 조회
router.get('/', function(req, res) {
	console.log("get: ");
	console.log(req.body);
	return PostModel.find(function (err, post) {

		if (!err) {
			console.log(post);
			res.send(post);
		} else {
			return console.log(err);
		}
	});
	//res.send([{name:'wine1'}, {name:'wine2'}]);
});

// POST 하나만 조회
router.get('/:id', function(req, res) {
	console.log("get: ");
	console.log(req.body);
	return PostModel.findById(req.params.id, function (err, post) {
		if (!err) {
			return res.send(post);
		} else {
			return console.log(err);
		}
	});
});

// POST 삭제
router.post('/delete', function(req, res) {
	var id = req.param('id');
	PostModel.findByIdAndRemove(id,function(err) {
		if (err){
			console.log('Error in Delete bbs: '+err);
			res.send({"result":false});
		}
		res.send({"result":true});
	})
});

//POST 수정
router.post('/update', function(req, res) {
	var id = req.param('id');
	PostModel.findById(id, function(err, post) {
		if (err) {
			console.log('Err in update post: '+err);
			res.send({'result':false});
		}
		post.title = req.param('title');
		post.save(function() {
			res.send({'result':true});
		})
	})
});

module.exports = router;