import { Card } from "./card_class";

export class Player {
    id: string;
    name: string;
    chips: number;
    cards: Array<Card>;
    blind:string;
    notPlaying: boolean;
    private _lastbet: number;
    
    constructor(socketId: string, name: string, chips: number = 5000, cards: Array<Card> = [], blind: string = "", notPlaying: boolean = false) {
        this.id = socketId;
        this.name = name;
        this.chips = chips;
        this.cards = cards;
        this.blind = blind;
        this.notPlaying = notPlaying;
    }
}