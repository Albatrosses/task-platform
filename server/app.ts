import debugServer from "debug";
const debug = debugServer("demo:server");
import * as bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import ejs from "ejs";
import express from "express";
import * as http from "http";
import logger from "morgan";
import * as path from "path";
import graphqlServer from "./api/index";
import route from "./route";

const app = express();
app.set("views", path.join(__dirname, "../client/build/"));
app.engine(".html", ejs.__express);
app.set("view engine", "html");
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../client/build/")));
app.use("/", route);
app.use(cookieParser());
graphqlServer(app);

app.use((req, res, next) => {
  const err: any = new Error("Not Found");
  err.status = 404;
  next(err);
});

if (app.get("env") === "development") {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: err
    });
  });
}

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {}
  });
});

const port = normalizePort(process.env.PORT || "8080");
app.set("port", port);

const server = http.createServer(app);

server.listen(port);
server.on("error", onError);
server.on("listening", onListening);

function normalizePort(val) {
  const port = parseInt(val, 10);
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

  const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  switch (error.code) {
    case "EACCES":
      // tslint:disable-next-line: no-console
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      // tslint:disable-next-line: no-console
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}
