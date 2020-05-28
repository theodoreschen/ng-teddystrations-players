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
  @Output() originPlayerEmitter = new EventEmitter<string>();

  previousPhrase: string;

  sketchpadSize: number;

  constructor(private game: GameService) { }

  ngOnInit(): void {
    this.sketchpadSize = window.innerWidth * 0.9;

    let round = parseInt(this.state.message);
    this.game.retrieveContent(this.playerUid, round).subscribe(content => {
      this.previousPhrase = content.content;
      this.originPlayerEmitter.emit(content.originPlayer);
    });
  }

  saveImageHandler(event: string): void {
    this.sketchPhraseEmitter.emit(event);
  }

}
