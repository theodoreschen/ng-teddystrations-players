import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignInComponent } from './sign-in.component';
import { FormsModule } from '@angular/forms';
import { GameService } from '../game.service';

describe('SignInComponent', () => {
  let mockGame;
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;

  beforeEach(async(() => {
    mockGame = jasmine.createSpyObj(["addNewPlayer"]);
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ SignInComponent ],
      providers: [
        { provide: GameService, useValue: mockGame }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
