import * as ip from "ip";
import * as http from "http";
import * as express from "express";
import { Server } from "socket.io";

import { router } from "./router";
import { Game } from "./game";
import * as constants from "./constants";

const app = express.default();

app.use("/", express.static(constants.paths.staticDirectory));
app.use("/logic/", express.static(constants.paths.logicDirectory));
app.use("/", router);

const server = http.createServer(app);
const io = new Server(server);
let game = new Game();

// for test reason, simulates sb joining the game
let counter: number = 0;
let names: Array<string> = ["John", "Torben", "Jesper", "David"];

io.on("connection", (socket: any) => {
  
  console.log(`ID: "${socket.id}" connected the server.`)
  let name: string = names[counter];
  counter++;
  game.join(socket.id, name);

  socket.on("disconnect", () => {
    console.log(`ID: "${socket.id}" disconnected the server.`)
    game.leave(socket.id);
    counter--;
  });
});

server.listen(constants.HTTP_PORT, () => {
  console.log(`info`, `Webserver`, `Webserver ist in Betrieb unter http://${ip.address()}:${constants.HTTP_PORT}/`);
});
