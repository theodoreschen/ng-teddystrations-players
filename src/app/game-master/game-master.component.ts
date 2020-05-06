import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { GameState, Player } from '../game-server-types';
import { LoggerService } from '../logger.service';
import { GameService } from '../game.service';
import { CookieService } from 'ngx-cookie-service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-game-master',
  templateUrl: './game-master.component.html',
  styleUrls: ['./game-master.component.css']
})
export class GameMasterComponent implements OnInit, OnDestroy {
  @Input() develMode: boolean;
  statePoller: any;
  state: GameState;
  doStatePolling: boolean;
  playerUid: string;
  pollCounter: number;

  constructor(
    private log: LoggerService,
    private game: GameService,
    private cookie: CookieService
  ) { }

  ngOnInit(): void {
    this.develMode = false;
    this.doStatePolling = true;
    this.startPolling();

    this.playerUid = this.cookie.get('tedstrations-puid');
  }

  ngOnDestroy(): void {
    this.stopPolling();
  }

  startPolling(): void {
    // this.statePoller = interval(2000).subscribe(count => {
    //   this.game.fetchGameState().subscribe(state => {
    //     this.state = state;
    //     if (state.state === 'unauthenticated' && this.cookie.check('tedstrations-puid')) {
    //       this.cookie.delete('tedstrations-puid');
    //       this.playerUid = '';
    //     }
    //     this.pollCounter = count + 1;
    //   });
    // });
    this.state = <GameState>{state: "round_active", message: "1"};
  }

  stopPolling(): void {
    // this.statePoller.unsubscribe();
  }

  toggleStatePolling(): void {
    // for debugging only
    if (this.doStatePolling) this.stopPolling();
    else this.startPolling();
    this.doStatePolling = !this.doStatePolling;
  }

  playerUidHandler(event: string): void {
    this.playerUid = event;
    this.cookie.set('tedstrations-puid', event, 1);
  }

}
