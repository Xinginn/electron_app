import { BotInterface } from "./bot.interface";
import { Bot } from './bot';

export class Gardener extends Bot implements BotInterface{
  constructor(){
    super()
  }

  hello(): string {
    return ("Bonjour, je suis le jardinier.");
  }

  react(message: string): string|null {
    const response = message.toLocaleLowerCase().includes('fleur') ? "J'adore les fleurs!": null;
    return response;
  }

}