import { BotInterface } from "./bot.interface";

export class TamerBot implements BotInterface{
  constructor(){}

  hello(): string {
    return ("Bonjour, je suis un dompteur.");
  }

  react(message: string): string|null {
    const response = message.toLocaleLowerCase().includes('animal') ? "Je m'occupe des animaux": null;
    return response;
  }

}