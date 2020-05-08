import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialPhraseComponent } from './initial-phrase.component';
import { FormsModule } from '@angular/forms';
import { LoggerService } from '../logger.service';
import { GameService } from '../game.service';

describe('InitialPhraseComponent', () => {
  let mockLog, mockGame;
  let component: InitialPhraseComponent;
  let fixture: ComponentFixture<InitialPhraseComponent>;

  beforeEach(async(() => {
    mockLog = jasmine.createSpy();
    mockGame = jasmine.createSpy();

    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ InitialPhraseComponent ],
      providers: [
        {provide: LoggerService, useValue: mockLog},
        {provide: GameService, useValue: mockGame}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialPhraseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
