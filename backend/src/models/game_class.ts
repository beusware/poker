import { rejects } from "assert";
import { resolve } from "path";
import { Util } from "./../util";
import { Player } from "./player_class";
import { Message } from "./message_class";

let interval: NodeJS.Timeout;

export class Game {
  connected: Array<Player> = [];
  running: boolean = false;
  clientInteraction: any;

  // request to join the game
  async join (socketId: string, name: string, clientInteraction: any) {  

    // checks if the name is still aviable, else stops the join request
    for (let player of this.connected) {
        if (player.name == name) return false;
    }

    // TODO: implement a user list, where the information can be stored
    let player = new Player(socketId, name, clientInteraction);
    this.connected.push(player);
    console.log(`Player joined the game (Name: ${name} | ID: ${socketId})`);

    this.tryGameStart().then( gameStart => {
      if (this.connected.length >= 2 && this.connected.length <= 8 && !gameStart) return; // prevents from useless logging 
      console.log(`The attempt of starting a Game was ${gameStart ? "succesful" : "NOT succesful"}`);
      console.log(`Anzahl der Spieler: ${this.connected.length}, running: ${this.running}, counting: ${interval ? true : false}`);
      if (gameStart) {
        this.running = true;
        this.startGame();
      }
    });
  }

  tryGameStart(): Promise<boolean> {
    // async Promis to wait until the Interval ends
    return new Promise<boolean> ( resolve => {
      const players = this.connected;
  
      // checks if the Game can start
      if (this.running || players.length >= 8 || players.length < 2 || interval != null) {
        // resolve(false) => stpos the Game from starting
        resolve(false);
        return;
      }
  
      let time: number = 5; // length of the countdown until the Game begins
      interval = setInterval( () => {
        // stops the countdown if Player leaves or it ends
        if (players.length < 2 || time == 0) {
          clearInterval(interval);
          interval = null;
          
          if (time == 0) {
            // resolve(true) => starts the Game
            resolve(true);
            return;
          }
          
          // resolve(false) => stpos the Game from starting
          resolve(false);
          return;
        }
  
        time--;
      }, 1000);
    });
  }

  evaluateMessage(socketId: string, message: string): void {
    let messageObject = new Message(Util.objectOfArrayWithProperty(this.connected, "id", socketId).name, message);
    
    // prevents Player from interacting without being on turn
    /* if (this.round.getPlayingPlayer().id != socketId) messageObject.type = "chit"; */

    // executes the command typed in the chat
    if (messageObject.type == "command") { 
      let amount: number;

      if (messageObject.content[0] == "raise") {
        // raise "to" or raise "by"
        let raiseAction = isNaN(parseInt(messageObject.content[1])) ? messageObject.content[1] : "to";
        // the amount of chips raised 
        amount = isNaN(parseInt(messageObject.content[1])) ? parseInt(messageObject.content[2]) : parseInt(messageObject.content[1]);
        
        // transforms the amount of raise "by" into the needed amount of raise "to"
        if (raiseAction == "by") {
          /* amount = this.round.lastBet + amount; */
        }
      }

     /*  this.preflop(socketId, messageObject.content[0], amount); */
    }
    
    // sends the message to every client connected
    this.clientInteraction.message(messageObject);
  }

  startGame() {
    console.log("Eine Runde Poker hat begonnen!");
  }

  // Player left the game
  leave(socketId: string): void {

    // removing the Player out the Array
    for (let index in this.connected) {
      if (this.connected[index].id == socketId) {
        console.log(`Player left the game (Name: ${this.connected[index].name} | ID: ${this.connected[index].id})`);
        this.connected.splice(parseInt(index));
      }
    }
  }
}