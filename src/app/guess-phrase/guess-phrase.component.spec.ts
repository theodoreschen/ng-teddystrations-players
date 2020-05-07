import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuessPhraseComponent } from './guess-phrase.component';

describe('GuessPhraseComponent', () => {
  let component: GuessPhraseComponent;
  let fixture: ComponentFixture<GuessPhraseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuessPhraseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuessPhraseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
