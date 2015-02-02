var monk = require("monk");
var wrap = require("co-monk");
var db = monk(process.env.IP+"/KoaVote");

var questions = wrap(db.get("questions"));
module.exports.questions = questions;