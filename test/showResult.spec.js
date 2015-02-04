var app = require('./../app.js');
var request = require('supertest').agent(app.listen());

var db = require("./../lib/db.js");
var co = require("co");
var should = require("should");
var testHelpers = require("./testHelpers.js");

describe("Showing results", function () {
	var filterPostData = {};

	beforeEach(function (done) {
		filterPostData = {
			questionTitle : '',
			tagString : '',
			from : '',
			to : ''
		};

		done();
	});

	afterEach(function (done) {
		testHelpers.removeAllDocs();
		done();
	});
	
	it("should have a page to filter results from", function(done){
	    co(function *(){
	        yield [
	            db.questions.insert({title: "Question Q1"}),
	            db.questions.insert({title: "Question Q2"}),
	            db.questions.insert({title: "Question Q3"})
	        ];
	        
	        request
	            .get("/results")
	            .expect(function(res){
	                res.text.should.containEql("Question Q1");
	                res.text.should.containEql("Question Q2");
	                res.text.should.containEql("Question Q3");
	            })
	            .expect(200, done)
	    });
	});
});