import * as ip from "ip";
import * as http from "http";
import * as express from "express";
import { Server } from "socket.io";

import { router } from "./router";
import * as constants from "./constants";

const app = express.default();

app.use("/", express.static(constants.paths.staticDirectory));
app.use("/logic/", express.static(constants.paths.logicDirectory));
app.use("/", router);

const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket: any) => {
  console.log("connected")

  socket.on("disconnect", () => {
    console.log("disconnected")
  });
});

server.listen(constants.HTTP_PORT, () => {
  console.log(`info`, `Webserver`, `Webserver ist in Betrieb unter http://${ip.address()}:${constants.HTTP_PORT}/`);
});
