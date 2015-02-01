var koa = require("koa"),
    route = require("koa-route"),
    app = module.exports = koa();

//routes
var homeRoutes = require("./routes/homeRoutes.js");
app.use(route.get("/", homeRoutes.showHome));

//Start app
app.listen(process.env.PORT, process.env.IP);
console.log("Server is rinning on port: " + process.env.PORT);