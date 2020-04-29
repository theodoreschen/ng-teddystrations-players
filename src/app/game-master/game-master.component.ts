import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameState } from '../game-server-types';
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
  develMode: boolean;
  statePoller: any;
  state: GameState;
  doStatePolling: boolean;
  playerUid: string;

  constructor(
    private log: LoggerService,
    private game: GameService,
    private cookie: CookieService
  ) { }

  ngOnInit(): void {
    this.develMode = this.log.develMode;
    this.doStatePolling = true;
    this.startPolling();

    this.playerUid = this.cookie.get('tedstrations-puid');
  }

  ngOnDestroy(): void {
    this.stopPolling();
  }

  startPolling(): void {
    this.statePoller = interval(2000).subscribe(_ => {
      this.game.fetchGameState().subscribe(state => {
        this.state = state;
      });
    });
  }

  stopPolling(): void {
    this.statePoller.unsubscribe();
  }

  toggleStatePolling(): void {
    // for debugging only
    if (this.doStatePolling) this.stopPolling();
    else this.startPolling();
    this.doStatePolling = !this.doStatePolling;
  }

  gameUidHandler(event): void {
    this.playerUid = event;
    this.cookie.set('teddystrations-puid', event, 1);
  }

}
