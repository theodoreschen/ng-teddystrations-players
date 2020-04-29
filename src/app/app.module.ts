import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoggerWidgetComponent } from './logger-widget/logger-widget.component';
import { GameMasterComponent } from './game-master/game-master.component';

@NgModule({
  declarations: [
    AppComponent,
    LoggerWidgetComponent,
    GameMasterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
