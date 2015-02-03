var render = require("./../lib/render.js");
var parse = require("co-body");
var db = require("./../lib/db.js");
var utils = require("./../lib/utils.js")

module.exports.showAddVote = function *(){
    var questionId = this.query.questionId;
    
    if(!utils.exists(this.query.questionId)){
        this.set("ErrorMessage", "No questionId passed to the page")
        this.redirect("/");
        return
    }
    
    var question = yield db.questions.findById(questionId);
    
    if(!utils.exists(question)){
        this.set("ErrorMessage", "No question found for id: "+ questionId)
        this.redirect("/");
        return;
    }
    
    var vm = {
        tagString: question.tags.join(", "),
        questionTitle: question.title,
        questionId: questionId
    }
    
    this.body = yield render("newVote", vm);
};

module.exports.addVote = function *(){
    var postedData = yield parse(this);
    
    //Validate It
    if(!utils.exists(postedData.questionId)){
        this.set("ErrorMessage", "questionId required");
        this.redirect("/");
        return;
    }
    
    //Create It
    var vote = {
		tags : utils.splitAndTrimTagString(postedData.tagString),
		created_at : new Date,
		questionId : postedData.questionId,
		value : postedData.voteValue
	};
    
    //Store it
    var v = yield db.votes.insert(vote);
    this.redirect("/vote/" + v._id + "/comment");
}
