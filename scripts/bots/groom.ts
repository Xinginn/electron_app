import { BotInterface } from "./bot.interface";
import { Bot } from './bot';

export class Groom extends Bot implements BotInterface{
  constructor(){
    super()
  }

  hello(): string {
    return ("Bonjour, je suis le portier.");
  }

  react(message: string): string|null {
    const response = message.toLocaleLowerCase().includes('bonjour') ? 'Bonjour!': null;
    return response;
  }

}