import * as bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import ejs from "ejs";
import express from "express";
import * as http from "http";
import logger from "morgan";
import * as path from "path";
import graphqlServer from "./api/index";
import { generateErrorLog, generateLog } from "./helper/log";
import route from "./route";

const app = express();
app.engine(".html", ejs.__express);
app.set("views", path.join(__dirname, "../client/build/"));
app.set("view engine", "html");
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "../client/build/")));
app.use("/media", express.static(path.join(__dirname, "media/")));
app.use(cookieParser());
graphqlServer(app);
app.use("/", route);

const port = process.env.PORT || 8080;
app.set("port", port);
const server = http.createServer(app);
server.listen(port);
server.on("listening", () => {
  generateLog(`server running ${port}`);
});
server.on("error", (error: any) => {
  if (error.syscall !== "listen") {
    throw error;
  }
  switch (error.code) {
    case "EACCES":
      // tslint:disable-next-line: no-console
      generateErrorLog(new Error(`${port} requires elevated privileges`));
      process.exit(1);
    case "EADDRINUSE":
      // tslint:disable-next-line: no-console
      generateErrorLog(new Error(`${port} is already in use`));
      process.exit(1);
    default:
      throw error;
  }
});
