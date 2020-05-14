import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SketchPhraseComponent } from './sketch-phrase.component';
import { GameService } from '../game.service';
import { of } from 'rxjs';
import { Content } from '../game-server-types';

describe('SketchPhraseComponent', () => {
  let mockGame;
  let component: SketchPhraseComponent;
  let fixture: ComponentFixture<SketchPhraseComponent>;

  let mockContent: Content = <Content>{round: 1, content: "dummy", originPlayer: "aaaa"};

  beforeEach(async(() => {
    mockGame = jasmine.createSpyObj(["retrieveContent"]);

    TestBed.configureTestingModule({
      declarations: [ SketchPhraseComponent ],
      providers: [
        { provide: GameService, useValue: mockGame }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SketchPhraseComponent);
    component = fixture.componentInstance;
    component.state = {state: "ROUND_ACTIVE", message: "1"};
    mockGame.retrieveContent.and.returnValue(of(mockContent));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
