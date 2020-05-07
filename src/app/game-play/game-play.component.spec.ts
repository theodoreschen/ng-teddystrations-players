import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamePlayComponent } from './game-play.component';
import { GameState } from '../game-server-types';

describe('GamePlayComponent', () => {
  let component: GamePlayComponent;
  let fixture: ComponentFixture<GamePlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamePlayComponent ]
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
