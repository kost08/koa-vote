var render = require("./../lib/render.js");
var db = require("./../lib/db.js");

module.exports.showAddVote = function *(){
    var questionId = this.query.questionId;
    
    if(!exists(this.query.questionId)){
        this.set("ErrorMessage", "No questionId passed to the page")
        this.redirect("/");
        return
    }
    
    var question = yield db.questions.findById(questionId);
    
    if(!exists(question)){
        this.set("ErrorMessage", "No question found for id: "+ questionId)
        this.redirect("/");
        return
    }
    
    var vm = {
        tagString: question.tags.join(", "),
        questionTitle: question.title,
        questionId: questionId
    }
    
    this.body = yield render("newVote", vm);
};

var exists = function (value) {
	if(value === undefined)
		return false;
	if(value === null)
		return false;
	return true;
};
