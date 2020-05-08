import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { LoggerService } from '../logger.service';

@Component({
  selector: 'initial-phrase',
  templateUrl: './initial-phrase.component.html',
  styleUrls: ['./initial-phrase.component.css']
})
export class InitialPhraseComponent implements OnInit {
  initialPhrase: string;

  constructor(
    private log: LoggerService,
    private game: GameService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {

  }

}
