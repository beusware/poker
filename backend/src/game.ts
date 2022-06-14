import { rejects } from "assert";
import { resolve } from "path";
import { Player } from "./models/player_class";

let interval: NodeJS.Timeout;

export class Game {
  connected: Array<Player> = [];
  running: boolean = false;

  // request to join the game
  async join (socketId: string, name: string) {  

    // checks if the name is still aviable, else stops the join request
    for (let player of this.connected) {
        if (player.name == name) return false;
    }

    // TODO: implement a user list, where the information can be stored
    let player = new Player(socketId, name)
    this.connected.push(player);
    console.log(`Player joined the game (Name: ${name} | ID: ${socketId})`);

    this.tryGameStart().then( value => {
      console.log(`The attempt of starting a Game was ${value ? "succesful" : "NOT succesful"}`);
      /* if (value) {
        this.running = true;
        this.startGame();
      } */
    });
  }

  tryGameStart() {
    // async Promis to wait until the Interval ends
    return new Promise<boolean> ( resolve => {
      const players = this.connected;
  
      // checks if the Game can start
      if (this.running || players.length >= 8 || players.length < 2 || interval != null) {
        console.log(`Poker kann nicht starten. Anzahl der Spieler: ${players.length}, running: ${this.running}`);
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