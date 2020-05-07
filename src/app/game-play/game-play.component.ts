import { Component, OnInit, Input } from '@angular/core';
import { LoggerService } from '../logger.service';
import { GameState } from '../game-server-types';

@Component({
  selector: 'app-game-play',
  templateUrl: './game-play.component.html',
  styleUrls: ['./game-play.component.css']
})
export class GamePlayComponent implements OnInit {
  @Input() state: GameState;

  constructor(
    private log: LoggerService
  ) { }

  ngOnInit(): void {
  }

  saveImageHandler(event: string): void {
    this.log.DEBUG("GamePlayComponent.saveImageHandler", event);
  }

  setView(): string {
    if (this.state.message === "1") return "initial";
    if (parseInt(this.state.message) % 2 === 0) return "sketch";
    else return "guess"
  }

}
