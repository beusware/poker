import { Util } from "../util";
import { Card } from "./card_class";

const numbers = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
const suits = ["clubs", "diamonds", "hearts", "spades"];

const generateAllCards = (): Array<Card> => {
  let result: Array<Card> = [];

  for (let suit of suits) {
    for (let number of numbers) {
      result.push(new Card(suit, number));
    }
  }

  return result;
}

export class Dealer {
  cards: Array<Card>;
  table: Array<Card>;
  constructor(cards = generateAllCards(), table: Array<Card> = []) {
    this.cards = cards;
    this.table = table;
  }

  deal(): Card {
    let index: number = Util.randomNumber(0, this.cards.length - 1);
    let card: Card = this.cards[index];

    this.cards.splice(index, 1);
    return card;
  }
}