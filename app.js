var koa = require("koa");
var route = require("koa-route");
var app = module.exports = koa();
var serve = require("koa-static");

//App configuration
app.use(serve(__dirname + "/public"));
//routes
var homeRoutes = require("./routes/homeRoutes.js");
app.use(route.get("/", homeRoutes.showHome));
var questionRoutes = require("./routes/questionRoutes");
app.use(route.get("/question", questionRoutes.showNewQuestion));

//Start app
app.listen(process.env.PORT, process.env.IP);
console.log("Server is rinning on port: " + process.env.PORT);