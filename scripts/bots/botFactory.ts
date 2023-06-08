import { BotInterface } from "./bot.interface";

export class BotFactory {

  constructor() {}

  public createBots(botNumber: number): BotInterface[] {
    const bots = []

    for (let i = 0; i < botNumber; i++) {
      let botType = Math.floor(Math.random() * 2);
      switch (botType) {
        /*
        case 0:
          bots.push(new Groom())
          break;
        case 1:
          bots.push(new LoremBot(this.http))
          break;
        */
        default:
          break;
      }
    }

    return bots;
  }

}