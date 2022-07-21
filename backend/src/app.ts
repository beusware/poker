import * as ip from "ip";
import * as http from "http";
import * as express from "express";
import { Server } from "socket.io";

import { router } from "./router";
import { Game } from "./models/game_class";
import { Message } from "./models/message_class";
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
  game.join(socket.id, name, clientInteraction);

  socket.on("disconnect", () => {
    console.log(`ID: "${socket.id}" disconnected the server.`)
    game.leave(socket.id);
    counter--;
  });
});

server.listen(constants.HTTP_PORT, () => {
  console.log(`info`, `Webserver`, `Webserver ist in Betrieb unter http://${ip.address()}:${constants.HTTP_PORT}/`);
});

// interactions that the Plyer_Class does with the client
const clientInteraction = {
  // send a message to a single client
  message: (socketId: string, messageObject: Message) => {
    io.to(socketId).emit("appendMessage", messageObject);
  },
  // send to the player whose turn is
  yourTurn: (socketId: string) => {
    // TODO: implement on clientsite
    io.to(socketId).emit("yourTurn");
  }
};

// interactions that the Game_Class does with the client
const gameInteraction = {
  // send a message to every player
  message: (messageObject: Message) => {
    io.emit("appendMessage", messageObject);
  }
};
game.clientInteraction = gameInteraction;