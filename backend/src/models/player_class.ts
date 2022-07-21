import { Card } from "./card_class";
import { Message } from "./message_class";

export class Player {
  id: string;
  name: string;
  chips: number;
  cards: Array<Card>;
  blind:string;
  notPlaying: boolean;
  lastbet: number;
  clientInteraction: any;
  
  constructor(socketId: string, name: string, clientInteraction: any, chips: number = 5000, cards: Array<Card> = [], blind: string = "", notPlaying: boolean = false) {
    this.id = socketId;
    this.name = name;
    this.clientInteraction = clientInteraction;
    this.chips = chips;
    this.cards = cards;
    this.blind = blind;
    this.notPlaying = notPlaying;
  }

  // sends a message to the client
  message(messageObject: Message) {
    this.clientInteraction.message(this.id, messageObject);
  };

  yourTurn() {
    // activats the client`s buttons to interact with the server
    this.clientInteraction.yourTurn(this.id);
    this.message(new Message("Dealer", "It´s your turn!", "system"));
  }
}