var app = require("./../app.js");
var request = require("supertest").agent(app.listen());

var db = require("./../lib/db.js");
var co = require("co");
var should = require("should");
var testHelpers = require("./testHelpers.js");

describe("adding votes", function(){
    beforeEach(function(done){
        testHelpers.removeAllDocs();
        done();
    });
    
    afterEach(function(done){
        testHelpers.removeAllDocs();
        done();
    });
    
    var test_question = { title: "To be?", tags: ["tag1", "tag2"]}
    
	it("has a page for voting from", function (done) {
		co(function *() {
			var q = yield db.questions.insert(test_question);

			request
				.get("/vote?questionId=" + q._id)
				.expect("Content-Type", /html/)
				.expect(function (res) {
					res.text.should.containEql(q.title);
				})
				.expect(200, done);
		});
	});
	
	it("should return an error when no question can be found", function(done){
	    request
	        .get("/vote?questionId=000000000000000000000000")
	        .expect(302)
	        .expect("location", "/")
	        .expect("ErrorMessage", "No question found for id: 000000000000000000000000")
	        .end(done);
	});
	
	it("should return an error when no question id passed to the query", function(done){
	    request
	        .get("/vote")
	        .expect(302)
	        .expect("location", "/")
	        .expect("ErrorMessage", "No questionId passed to the page")
	        .end(done);
	});
	
	var test_vote_form = {
		tagString : "tag1, tag2, tag3",
		questionId : 000000000000000000000000,
		voteValue: 4
	};

});