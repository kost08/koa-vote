var render = require("./../lib/render.js");

module.exports.showNewQuestion = function *(){
    this.body = yield render("newQuestion");
}