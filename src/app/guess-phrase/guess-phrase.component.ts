import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GameState } from '../game-server-types';
import { GameService } from '../game.service';

@Component({
  selector: 'guess-phrase',
  templateUrl: './guess-phrase.component.html',
  styleUrls: ['./guess-phrase.component.css']
})
export class GuessPhraseComponent implements OnInit {
  @Input() state: GameState;
  @Input() playerUid: string;
  @Output() guessPhraseEmitter = new EventEmitter<string>();
  @Output() originPlayerEmitter = new EventEmitter<string>();

  guessPhrase: string;
  previousSketch: string;

  constructor(private game: GameService) { }

  ngOnInit(): void {
    let round = parseInt(this.state.message);
    this.game.retrieveContent(this.playerUid, round).subscribe(content => {
      this.previousSketch = content.content;
      this.originPlayerEmitter.emit(content.originPlayer);
    });
  }

  onSubmit(): void {
    this.guessPhraseEmitter.emit(this.guessPhrase);
  }

}
