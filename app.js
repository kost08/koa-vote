var koa = require("koa"),
    route = require("koa-route"),
    app = module.exports = koa();

var render = require("./lib/render.js");
    
app.use(route.get("/", showHome));

function *showHome(id){
    this.body = yield render("home");
}

app.listen(process.env.PORT, process.env.IP);
console.log("Server is rinning on port: " + process.env.PORT);