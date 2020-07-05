import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
  }));

  it('should create the app', () => {
    let app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should handle develMode update', () => {
    let app = fixture.componentInstance;
    app.develModeHandler(false);

    expect(app.develMode).toEqual(false);
  });
});
