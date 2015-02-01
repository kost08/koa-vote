var app = require("../app.js");
var request = require("supertest").agent(app.listen());

describe("The home page", function(){
    it("should display nicely without errors", function(done){
        request
            .get("/")
            .expect(200)
            .expect("Content-type", /html/)
            .end(done);
    });
});