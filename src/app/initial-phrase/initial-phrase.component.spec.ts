import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialPhraseComponent } from './initial-phrase.component';

describe('InitialPhraseComponent', () => {
  let component: InitialPhraseComponent;
  let fixture: ComponentFixture<InitialPhraseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitialPhraseComponent ]
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
