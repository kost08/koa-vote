var app = require("../app.js");
var request = require("supertest").agent(app.listen());

var db = require("./../lib/db.js");
var co = require("co");
var should = require("should");
var testHelpers = require("./testHelpers")

describe("The home page", function(){
    
    beforeEach(function(done){
        testHelpers.removeAllDocs();
        done();
    });
    
    afterEach(function(done){
        testHelpers.removeAllDocs();
        done();
    });
    
    it("should display nicely without errors", function(done){
        request
            .get("/")
            .expect(200)
            .expect("Content-type", /html/)
            .end(done);
    });
    it("should list all the questions", function(done){
        co(function *(){
            db.questions.insert({title: "Question Q1"});
            db.questions.insert({title: "Question Q2"});
            request
                .get("/")
                .expect(200)
                .expect(function(res){
                    res.text.should.containEql("Question Q1");
                    res.text.should.containEql("Question Q2");
                })
                .end(done);
        });
    })
});