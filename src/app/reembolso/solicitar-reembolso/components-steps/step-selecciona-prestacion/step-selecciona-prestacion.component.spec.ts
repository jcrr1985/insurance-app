import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepSeleccionaPrestacionComponent } from './step-selecciona-prestacion.component';

describe('StepSeleccionaPrestacionComponent', () => {
  let component: StepSeleccionaPrestacionComponent;
  let fixture: ComponentFixture<StepSeleccionaPrestacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepSeleccionaPrestacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepSeleccionaPrestacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
