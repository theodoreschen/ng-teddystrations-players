import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamePlayComponent } from './game-play.component';
import { GameState } from '../game-server-types';
import { LoggerService } from '../logger.service';
import { GameService } from '../game.service';
import { CookieService } from 'ngx-cookie-service';

describe('GamePlayComponent', () => {
  let mockLog, mockGame, mockCookie;
  let component: GamePlayComponent;
  let fixture: ComponentFixture<GamePlayComponent>;

  beforeEach(async(() => {
    mockLog = jasmine.createSpyObj(["DEBUG"]);
    mockGame = jasmine.createSpyObj(["submitContent"]);
    mockCookie = jasmine.createSpyObj(["delete", "get"]);

    TestBed.configureTestingModule({
      declarations: [ GamePlayComponent ],
      providers: [
        { provide: LoggerService, useValue: mockLog },
        { provide: GameService, useValue: mockGame },
        { provide: CookieService, useValue: mockCookie }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamePlayComponent);
    component = fixture.componentInstance;
    component.state = <GameState>{state: "round_active", message: "1"};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
