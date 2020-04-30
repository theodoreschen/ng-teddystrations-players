import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GameService } from '../game.service';
import { Player } from '../game-server-types';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  @Input() develMode: boolean;
  @Output() playerUidEmitter = new EventEmitter<string>();
  playerName: string;
  puid: string;

  constructor(private game: GameService) { }

  ngOnInit(): void {
    this.develMode = false;
  }

  onSubmit(): void {
    this.game.addNewPlayer(this.playerName)
      .subscribe(result => {
        this.puid = result.uid;
        this.playerUidEmitter.emit(this.puid);
      });
  }

}
