var app = require("../app.js");
var request = require("supertest").agent(app.listen());

describe("Add questions", function(){
    it("should display a nice page to add question", function(done){
       request
            .get("/question")
            .expect(200)
            .expect("Content-Type", /html/)
            .end(done);
    });
});