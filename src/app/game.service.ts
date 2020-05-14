import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { gameServerUrl } from './game-server-url';
import { GameState, Player, Content } from './game-server-types';
import { LoggerService } from './logger.service';
import { of, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameService{
  private jsonHttpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  private CorsHttpOptions = {
    headers: new HttpHeaders({'Access-Control-Allow-Origin': '*'})
  };

  constructor(
    private http: HttpClient,
    private log: LoggerService
  ) { }

  fetchGameState(): Observable<GameState> {
    // return of(<GameState>{state: "ready", message: null});
    return this.http.get<GameState>(`${gameServerUrl}/game-state`)
      .pipe(
        tap(result => this.log.DEBUG("GameService.fetchGameState", `Retrieved ${JSON.stringify(result)}`)),
        catchError(this.handleError<any>("GameService.fetchGameState"))
      );
  }

  addNewPlayer(name: string): Observable<Player> {
    let jsonBody = {name: name};
    return this.http.post<Player>(`${gameServerUrl}/player/add`, jsonBody, this.jsonHttpOptions)
      .pipe(
        tap(result => this.log.DEBUG("GameService.addNewPlayer", `Retrieved ${JSON.stringify(result)}`)),
        catchError(this.handleError<any>("GameService.addNewPlayer"))
      );
  }

  submitContent(uid: string, content: Content): Observable<any> {
    return this.http.post(`${gameServerUrl}/${uid}`, content, this.jsonHttpOptions)
      .pipe(
        tap(_ => this.log.DEBUG(
          "GameService.submitContent",
          `Content for round ${content.round} submitted to ${content.originPlayer}`
        )),
        catchError(this.handleError<any>("GameService.submitContent"))
      );
  }

  retrieveContent(uid: string, round: number): Observable<Content> {
    return this.http.get<Content>(`${gameServerUrl}/${uid}/${round}`)
      .pipe(
        tap(result => this.log.DEBUG(
          "GameService.retrieveContent",
          `Content for round ${result.round} received from player ${result.originPlayer}`
        )),
        catchError(this.handleError<any>("GameService.retrieveContent"))
      );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log.ERROR(operation, `Failed with error '${error.message}'`);
      return of(result as T);
    };
  }
}
