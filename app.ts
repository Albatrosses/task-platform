import debugServer from "debug";
const debug = debugServer("demo:server");
import * as bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import ejs from "ejs";
import express from "express";
import * as http from "http";
import logger from "morgan";
import * as path from "path";
import graphqlServer from "./server/api/index";
import route from "./server/route/";

const app = express();
app.set("views", path.join(__dirname, "../views/"));
app.engine(".html", ejs.__express);
app.set("view engine", "html");
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../views/")));
app.use("/", route);
graphqlServer(app);

app.use(function(req, res, next) {
  const err = new Error("Not Found");
  // err.status = 404;
  next(err);
});

if (app.get("env") === "development") {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {}
  });
});

let port = normalizePort(process.env.PORT || "8080");
app.set("port", port);

let server = http.createServer(app);

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

function normalizePort(val) {
  let port = parseInt(val, 10);
  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  let bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  let addr = server.address();
  let bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}
