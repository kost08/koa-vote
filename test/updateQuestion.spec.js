var app = require("./../app.js");
var request = require("supertest").agent(app.listen());

var db = require("./../lib/db.js");
var co = require("co");
var should = require("should");
var testHelpers = require("./testHelpers");

describe("Updating qustion", function(){
    
    beforeEach(function(done){
        testHelpers.removeAllDocs();
        done();
    });
    
    afterEach(function(done){
        testHelpers.removeAllDocs();
        done();
    });
    
    it("should display a nice page for existing question", function(done){
        co(function *(){
            var q = yield db.questions.insert({
                title: "A question",
                tags: ["tag1", "tag2"]
            });
            
            request
                .get("/question/"+ q._id)
                .expect("Content-Type", /html/)
                .expect(function(res){
                    res.text.should.containEql(q.title);
                    res.text.should.containEql(q.tags[0], q.tags[1]);
                })
                .expect(200, done);
                
        });
    });
    
    it("should update an existing question", function(done){
        co(function *(){
            var q = yield db.questions.insert({
                title: "A question",
                tags: ["tag1", "tag2"]
            });
            
            request
                .post("/question/"+ q._id)
                .send({
                    questionTitle: " updated question",
                    tagString: "tag3, tag4"
                })
                .expect("location", "/question/" + q._id)
                .expect(302, done);
                
        });
    });
});