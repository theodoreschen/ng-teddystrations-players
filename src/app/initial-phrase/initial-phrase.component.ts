import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { GameService } from '../game.service';
import { LoggerService } from '../logger.service';
import { Content, GameState } from '../game-server-types';

@Component({
  selector: 'initial-phrase',
  templateUrl: './initial-phrase.component.html',
  styleUrls: ['./initial-phrase.component.css']
})
export class InitialPhraseComponent implements OnInit {
  @Output() initialPhraseEmitter = new EventEmitter<string>();

  initialPhrase: string;

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.initialPhraseEmitter.emit(this.initialPhrase);
  }

}
