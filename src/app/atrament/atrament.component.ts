import { Component, OnInit } from '@angular/core';
import { Atrament } from 'atrament';

@Component({
  selector: 'atrament',
  templateUrl: './atrament.component.html',
  styleUrls: ['./atrament.component.css']
})
export class AtramentComponent implements OnInit {
  canvas: any;
  sketchpad: any;

  constructor() { }

  ngOnInit(): void {
    this.canvas = document.querySelector("#sketchpad");
    this.sketchpad = new Atrament(this.canvas);
  }

}
