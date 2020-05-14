import { Component, OnInit, Input } from '@angular/core';
import { LoggerService } from '../logger.service';
import { GameState, Content, CompletedRoundsCookie } from '../game-server-types';
import { CookieService } from 'ngx-cookie-service';
import { GameService } from '../game.service';

@Component({
  selector: 'app-game-play',
  templateUrl: './game-play.component.html',
  styleUrls: ['./game-play.component.css']
})
export class GamePlayComponent implements OnInit {
  @Input() playerUid: string;
  @Input() state: GameState;

  originPlayer: string;
  completedRoundsCookie: CompletedRoundsCookie;

  constructor(
    private log: LoggerService,
    private game: GameService,
    private cookie: CookieService
  ) { }

  ngOnInit(): void {
    if (this.state.message === "1") {
      this.cookie.delete("tedstrations-rounds-complete");
      this.completedRoundsCookie = <CompletedRoundsCookie>{completedRounds: <number[]>[]};
    } else {
      let rounds = this.cookie.get("tedstrations-rounds-complete");
      // TODO: map the output of the JSON.parse into CompletedRoundsCookie interface
      this.completedRoundsCookie = JSON.parse(rounds);
    }
  }

  initialPhraseHandler(event: string): void {
    this.log.DEBUG("GamePlayComponent.initialPhraseHandler", event);
    let gameRound = parseInt(this.state.message);
    let content = <Content>{
      round: gameRound,
      content: event,
      originPlayer: this.playerUid
    };
    this.game.submitContent(this.playerUid, content).subscribe(_ => {
      this.completedRoundsCookie.completedRounds.push(gameRound);
      this.cookie.set("tedstrations-rounds-complete", JSON.stringify(this.completedRoundsCookie), 1);
    });
  }

  contentEmitterHandler(event: string): void {
    this.log.DEBUG("GamePlayComponent.contentEmitterHandler", event);
    let gameRound = parseInt(this.state.message);
    let content = <Content>{
      round: parseInt(this.state.message),
      content: event,
      originPlayer: this.originPlayer
    };
    this.game.submitContent(this.playerUid, content).subscribe(_ => {
      this.completedRoundsCookie.completedRounds.push(gameRound);
      this.cookie.set("tedstrations-rounds-complete", JSON.stringify(this.completedRoundsCookie), 1);
    });
  }

  private awaitNextRound(): boolean {
    let gameRound = parseInt(this.state.message);
    let idx = this.completedRoundsCookie.completedRounds.findIndex(value => gameRound == value);
    if (idx === -1) return false;
    else return true;
  }

  setView(): string {
    if (this.state.message === "1") return "initial";
    if (this.awaitNextRound()) return "awaiting-next-round";

    if (parseInt(this.state.message) % 2 === 0) return "sketch";
    else return "guess"
  }

}
