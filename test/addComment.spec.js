var app = require('./../app.js');
var request = require('supertest').agent(app.listen());

var db = require("./../lib/db.js");
var co = require("co");
var should = require("should");
var testHelpers = require("./testHelpers.js");

describe("Adding comments", function(){
    var a_test_vote = {};
    
	beforeEach(function (done) {
		a_test_vote = {
			tags: ['tag 1', 'tag 2', 'tag 3'],
			voteValue : 3,
			questionId : 0
		};
		done();
	});

	afterEach(function (done) {
		testHelpers.removeAllDocs();
		done();
	});
	
	it("should have a page to add comments", function(done){
	    co(function *(){
	        var vote = yield db.votes.insert(a_test_vote);
	        
	        request
	            .get('/vote/' + vote._id + '/comment')
	            .expect("Content-type", /html/)
	            .expect(200, done);
	    });
	});
	it("should add a comment to an existing vote", function(done){
	    co(function *() {
	        var vote = yield db.votes.insert(a_test_vote);
			vote;
	        request
	            .post("/vote/"+ vote._id +"/comment")
	            .send({comment: "A nice little comment"})
	            .expect(302)
	            .expect("location", '/vote?questionId='+ vote.questionId)
	            .end(done);
	    });
	});
});