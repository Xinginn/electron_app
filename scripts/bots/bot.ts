import { BotInterface } from "./bot.interface";

export class Bot implements BotInterface{
  constructor(){
    const names = ['Guillaume', 'Benjamin', 'Tristan', 'Tom', 'Quentin', 'Matthis', 'Fred', 'Félix']
    // selects name at random
    this.name = names[Math.floor(Math.random()*8)]
  }
  public name: string;



  hello(): string|null {
    return null;
  }

  react(message: string): string|null {
    return null;
  }

}