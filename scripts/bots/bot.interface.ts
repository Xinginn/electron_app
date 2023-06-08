export interface BotInterface {

  hello(): string
  react(message: string): string|null
}