"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var heroku_ssl_redirect_1 = __importDefault(require("heroku-ssl-redirect"));
var firebase_admin_1 = __importDefault(require("firebase-admin"));
var path_1 = __importDefault(require("path"));
var serviceAccount = require("./secret/huddle-7dff8-firebase-adminsdk-vnj3n-05c2a68ad5.json");
var cors_1 = __importDefault(require("cors"));
var socket_io_1 = require("socket.io");
var http_1 = __importDefault(require("http"));
var PORT = process.env.PORT || 8000;
var app = express_1.default();
app.use(heroku_ssl_redirect_1.default());
app.use(cors_1.default());
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(serviceAccount),
    databaseURL: "https://huddle-7dff8.firebaseio.com",
});
var server = http_1.default.createServer(app);
var io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
var sockets = require("./sockets")(io);
io.on("connection", sockets);
// In dev mode just hide hide app.uss(... ) below
app.use(express_1.default.static(path_1.default.join(__dirname, "./client/build")));
app.get("/contact-us", function (_req, res) {
    res.redirect("https://bigmesslabs.notion.site/Contact-Us-fe070dbeb780434eb2039858480af6c7");
});
app.get("*", function (req, res) {
    res.sendFile(path_1.default.join(__dirname + "/client/build/index.html"));
});
server.listen(PORT, function () { return console.log("App was started at port : " + PORT); });
