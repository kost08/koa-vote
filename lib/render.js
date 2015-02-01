var views = require("co-views");

//setip views mapping to .html
//to the swig template engine
module.exports = views(__dirname + "./../views",{
    map: { html: "swig" }
});