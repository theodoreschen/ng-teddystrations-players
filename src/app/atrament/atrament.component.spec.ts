import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtramentComponent } from './atrament.component';

describe('AtramentComponent', () => {
  let component: AtramentComponent;
  let fixture: ComponentFixture<AtramentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtramentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtramentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
