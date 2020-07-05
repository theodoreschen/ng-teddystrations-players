import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtramentComponent } from './atrament.component';
import { By } from '@angular/platform-browser';
import { Component } from '@angular/core';


describe('AtramentComponent', () => {
  let mockAtrament;
  let component: AtramentComponent;
  let fixture: ComponentFixture<AtramentComponent>;

  beforeEach(async(() => {
    mockAtrament = jasmine.createSpyObj(["clear", "toImage"]);

    TestBed.configureTestingModule({
      declarations: [ AtramentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtramentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // because Atrament object is not an Angular module, we need
    // to inject the mock directly into the atrament component itself
    component.sketchpad = mockAtrament;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a default button name', () => {
    expect(component.saveButtonName).toEqual('Save');
  });

  it('should clear drawing', () => {
    component.clearDrawing();
    fixture.detectChanges();

    expect(mockAtrament.clear).toHaveBeenCalled();
  });

  it('should set mode to draw', () => {
    component.toggleDraw();
    fixture.detectChanges();

    expect(mockAtrament.mode).toEqual('draw');
  });

  it('should set mode to erase', () => {
    component.toggleErase();
    fixture.detectChanges();

    expect(mockAtrament.mode).toEqual('erase');
  });

  it('should emit image as dataURL string', () => {
    spyOn(component.saveImageEmitter, 'emit');
    mockAtrament.toImage.and.returnValue("dummy-data");

    let deButton = fixture.debugElement.query(By.css("div #submit-button > button"));
    deButton.triggerEventHandler("click", null);
    expect(component.saveImageEmitter.emit).toHaveBeenCalledWith('dummy-data');
  });

  
});
