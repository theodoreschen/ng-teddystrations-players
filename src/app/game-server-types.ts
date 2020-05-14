export interface GameState {
  state: string,
  message: string
}

export interface Player {
  name: string,
  uid: string
}

export interface Content {
  round: number,
  content: string,
  originPlayer: string
}

export interface CompletedRoundsCookie {
  completedRounds: number[];
}