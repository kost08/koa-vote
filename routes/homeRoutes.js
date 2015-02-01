var render = require("./../lib/render.js");

module.exports.showHome = function *(id){
    this.body = yield render("home");
}