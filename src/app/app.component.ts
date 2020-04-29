import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  develMode: boolean = false;

  develModeHandler(event: boolean): void {
    this.develMode = event;
  }
}
