import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessPhraseComponent } from './guess-phrase.component';
import { FormsModule } from '@angular/forms';
import { GameService } from '../game.service';
import { of } from 'rxjs';
import { Content } from '../game-server-types';

describe('GuessPhraseComponent', () => {
  let mockGame;
  let component: GuessPhraseComponent;
  let fixture: ComponentFixture<GuessPhraseComponent>;

  let mockContent: Content = <Content>{round: 3, content: "dummy img", originPlayer: "aaaa"};

  beforeEach(async(() => {
    mockGame = jasmine.createSpyObj(["retrieveContent"]);

    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ GuessPhraseComponent ],
      providers: [
        { provide: GameService, useValue: mockGame }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuessPhraseComponent);
    component = fixture.componentInstance;
    component.state = {state: "ROUND_ACTIVE", message: "3"};
    mockGame.retrieveContent.and.returnValue(of());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
