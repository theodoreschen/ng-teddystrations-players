import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GameState } from '../game-server-types';
import { GameService } from '../game.service';

@Component({
  selector: 'sketch-phrase',
  templateUrl: './sketch-phrase.component.html',
  styleUrls: ['./sketch-phrase.component.css']
})
export class SketchPhraseComponent implements OnInit {
  @Input() state: GameState;
  @Input() playerUid: string;
  @Output() sketchPhraseEmitter = new EventEmitter<string>();

  previousPhrase: string;

  constructor(private game: GameService) { }

  ngOnInit(): void {
    let round = parseInt(this.state.message);
    this.game.retrieveContent(this.playerUid, round).subscribe(content => {
      this.previousPhrase = content.content;
    });
  }

  saveImageHandler(event: string): void {
    this.sketchPhraseEmitter.emit(event);
  }

}