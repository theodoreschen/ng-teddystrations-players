import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoggerWidgetComponent } from './logger-widget/logger-widget.component';
import { GameMasterComponent } from './game-master/game-master.component';
import { SignInComponent } from './sign-in/sign-in.component';

@NgModule({
  declarations: [
    AppComponent,
    LoggerWidgetComponent,
    GameMasterComponent,
    SignInComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
