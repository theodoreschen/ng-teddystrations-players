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
  completedRounds: string[];

  constructor(
    private log: LoggerService,
    private game: GameService,
    private cookie: CookieService
  ) { }

  ngOnInit(): void {
    let rounds = this.cookie.get("tedstrations-rounds-complete");
    if (rounds !== null) {
      // TODO: map the JSON.parse of rounds into the CompletedRoundsCookie type
      this.completedRounds = JSON.parse(rounds).completedRounds;
    } else {
      this.completedRounds = [];
    }
  }

  initialPhraseHandler(event: string): void {
    this.log.DEBUG("GamePlayComponent.initialPhraseHandler", event);
    let content = <Content>{
      round: parseInt(this.state.message),
      content: event,
      originPlayer: this.playerUid
    };
    this.game.submitContent(this.playerUid, content).subscribe()
  }

  contentEmitterHandler(event: string): void {
    this.log.DEBUG("GamePlayComponent.contentEmitterHandler", event);
    let content = <Content>{
      round: parseInt(this.state.message),
      content: event,
      originPlayer: this.originPlayer
    };
  }

  setView(): string {
    if (this.state.message === "1") return "initial";
    // if ()

    if (parseInt(this.state.message) % 2 === 0) return "sketch";
    else return "guess"
  }

}
