"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var mongoose_1 = __importDefault(require("mongoose")); // user: amukhe12 , password: MkJue2UCi38zPOen
var cookie_session_1 = __importDefault(require("cookie-session"));
var passport_1 = __importDefault(require("passport"));
var heroku_ssl_redirect_1 = __importDefault(require("heroku-ssl-redirect"));
var path_1 = __importDefault(require("path"));
var cors_1 = __importDefault(require("cors"));
var socket_io_1 = require("socket.io");
var http_1 = __importDefault(require("http"));
var keys = require("./server/config/keys.js");
var bodyParser = require("body-parser");
require("./server/models/User"); //User.js executes, i.e. User Model Class created. This must go beforethe passport require
require("./server/models/Meeting");
require("./server/services/passport.js");
mongoose_1.default.connect(keys.mongoURI);
var app = express_1.default();
app.use(cookie_session_1.default({
    //argument is an object that specifies configuration of cookies
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey], //a list of keys used to encrypt cookies
    //secure: true,
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use(bodyParser.json());
app.use(heroku_ssl_redirect_1.default());
app.use(cors_1.default());
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next(); // dont forget this
});
require("./server/routes/authRoutes")(app);
require("./server/routes/meetingRoutes")(app);
var server = http_1.default.createServer(app);
var io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
var sockets = require("./server/sockets")(io);
io.on("connection", sockets);
// In dev mode just hide hide app.uss(... ) below
app.use(express_1.default.static(path_1.default.join(__dirname, "./client/build")));
app.get("/contact-us", function (_req, res) {
    res.redirect("https://bigmesslabs.notion.site/Contact-Us-fe070dbeb780434eb2039858480af6c7");
});
app.get("*", function (req, res) {
    res.sendFile(path_1.default.join(__dirname + "/client/build/index.html"));
});
var PORT = process.env.PORT || 8000;
server.listen(PORT, function () { return console.log("App was started at port : " + PORT); });
