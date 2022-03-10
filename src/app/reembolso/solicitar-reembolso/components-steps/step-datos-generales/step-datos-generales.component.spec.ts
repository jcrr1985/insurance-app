import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepDatosGeneralesComponent } from './step-datos-generales.component';

describe('StepDatosGeneralesComponent', () => {
  let component: StepDatosGeneralesComponent;
  let fixture: ComponentFixture<StepDatosGeneralesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepDatosGeneralesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepDatosGeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
