var app = require("../app.js");
var request = require("supertest").agent(app.listen());

describe("Add questions", function(){
    a_question_form = {
        questionTitle: "A question?",
        tagString: "tag1, tag2, tag3"
    }
    
    it("should display a nice page to add question", function(done){
       request
            .get("/question")
            .expect(200)
            .expect("Content-Type", /html/)
            .end(done);
    });
    
    it("should store correctly formatted forms as a ne question", function(done){
        request
            .post("/question")
            .send(a_question_form)
            .expect(302) //redirect
            .expect("location", /^\/question\/[0-9a-fA-F]{24}$/) // question/:id
            .end(done);
    });
});