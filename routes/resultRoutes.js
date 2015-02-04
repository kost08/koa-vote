var render = require("./../lib/render.js");
var parse = require("co-body");
var db = require("./../lib/db.js");
var utils = require("./../lib/utils.js");

module.exports.showResultPage = function *(){
    var questionList = yield db.questions.find({});
    this.body = yield render("result", {questions: questionList});
}