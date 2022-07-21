const commands = ["check", "call", "raise", "pass", "quit"];
const types = ["command", "chit", "system"]; // CSS classes

export class Message{
  sender: string;
  message: string;
  type: string; // CSS classes
  content: Array<string>;

  constructor (sender: string, message: string, type?: string) {
    this.sender = sender;
    this.message = message;    
    this.content = message.toLocaleLowerCase().trim().split(" "); 
    this.type = commands.includes(this.content[0]) ? types[0] : types[1];
    
    if (this.content[0] == "raise") {
      // check for number to raise to
      let raiseConditions: boolean = !isNaN(parseInt(this.content[1]));
      // check if there are the right keywords to raise
      raiseConditions = raiseConditions || ((this.content[1] == "by" || this.content[1] == "to") && !isNaN(parseInt(this.content[2])));
      
      // prevents raise commands with wrong keywords
      if (!raiseConditions) this.type = "chit";
    }
    
    if (type) this.type = type;
  }
}