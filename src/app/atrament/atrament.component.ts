import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Atrament from 'atrament';

@Component({
  selector: 'atrament',
  templateUrl: './atrament.component.html',
  styleUrls: ['./atrament.component.css']
})
export class AtramentComponent implements OnInit {
  sketchpad: any;

  @Input() sketchWidth: number = 500;
  @Input() sketchHeight: number = 500;
  @Input() saveButtonName: string;

  @Output() saveImageEmitter = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    if (this.saveButtonName === "") this.saveButtonName = "Save";
    let canvas = document.querySelector("#sketchpad");
    this.sketchpad = new Atrament(canvas);
  }

  clearDrawing(): void {
    this.sketchpad.clear();
  }

  toggleDraw(): void {
    this.sketchpad.mode = "draw";
    this.sketchpad.weight = 3;
  }

  toggleErase(): void {
    this.sketchpad.mode = "erase";
    this.sketchpad.weight = 15;
  }

  saveImage(): void {
    const dataURL: string = <string>this.sketchpad.toImage();
    this.saveImageEmitter.emit(dataURL);
  }

}
