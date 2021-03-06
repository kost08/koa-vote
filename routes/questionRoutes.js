var render = require("./../lib/render.js");
var parse = require("co-body");
var db = require("./../lib/db.js");
var utils = require("./../lib/utils.js");

module.exports.showNewQuestion = function *() {
	this.body = yield render("newQuestion");
};

module.exports.addQuestion = function *(){
    var postedData = yield parse(this);
    
    var questionToStore = {
        title: postedData.questionTitle,
        tags: utils.splitAndTrimTagString(postedData.tagString)
    }
    
    var q = yield db.questions.insert(questionToStore);
    
    this.redirect("/question/" + q._id);
};

module.exports.showQuestion = function *(id){
    var q = yield db.questions.findById(id);
    
    var vm = {
        id: q._id.toString(),
        questionTitle: q.title,
        tagString: q.tags.join(", ")
    }
    
    this.body = yield render("showQuestion", vm);
};

module.exports.updateQuestion = function *(id){
    var postedData = yield parse(this);
    
    var questionToStore = {
        title: postedData.questionTitle,
        tags: utils.splitAndTrimTagString(postedData.tagString)
    }
    
    var q = yield db.questions.updateById(id, questionToStore);
    
    this.redirect("/question/" + id);    
}
