import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { LoggerService } from '../logger.service';
import { GameState, Content, CompletedRoundsCookie } from '../game-server-types';
import { CookieService } from 'ngx-cookie-service';
import { GameService } from '../game.service';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-game-play',
  templateUrl: './game-play.component.html',
  styleUrls: ['./game-play.component.css']
})
export class GamePlayComponent implements OnInit, OnDestroy {
  @Input() playerUid: string;
  @Input() state: GameState;

  originPlayer: string;
  completedRoundsCookie: CompletedRoundsCookie;
  view: string;
  currentRound: string;

  statePolling: Subscription;

  constructor(
    private log: LoggerService,
    private game: GameService,
    private cookie: CookieService
  ) { }

  ngOnInit(): void {
    this.log.DEBUG("GamePlayComponent.ngOnInit", JSON.stringify(this.state));
    this.currentRound = this.state.message;

    if (this.state.message === "1") {
      this.cookie.delete("tedstrations-rounds-complete");
      this.completedRoundsCookie = <CompletedRoundsCookie>{completedRounds: <number[]>[]};
    } else {
      // TODO: map the output of the JSON.parse into CompletedRoundsCookie interface
      this.completedRoundsCookie = JSON.parse(this.cookie.get("tedstrations-rounds-complete"));
    }
    this.setView();

    this.statePolling = interval(1000).subscribe(_ => {
      if (this.state.message !== this.currentRound) {
        this.currentRound = this.state.message;
        this.setView();
      }
    });
  }

  ngOnDestroy(): void {
    this.statePolling.unsubscribe();
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
      console.log(JSON.stringify(this.completedRoundsCookie));
      this.cookie.set("tedstrations-rounds-complete", JSON.stringify(this.completedRoundsCookie), 1);
      this.setView();
      console.log(this.view);
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
      this.setView();
    });
  }

  originPlayerEmitterHandler(event: string): void {
    this.originPlayer = event;
  }

  private awaitNextRound(): boolean {
    let gameRound = parseInt(this.state.message);
    let idx = this.completedRoundsCookie.completedRounds.findIndex(value => value === gameRound);
    if (idx === -1) return false;
    else return true;
  }

  private setView(): void {
    if (this.awaitNextRound()) {
      this.view = "awaiting-next-round";
      return
    }

    if (this.state.message === "1") {
      this.view = "initial";
      return
    }

    if ((parseInt(this.state.message) % 2) === 0) this.view = "sketch";
    else this.view = "guess";
  }

}
