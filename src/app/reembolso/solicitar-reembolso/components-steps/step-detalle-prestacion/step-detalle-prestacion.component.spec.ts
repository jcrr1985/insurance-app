import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepDetallePrestacionComponent } from './step-detalle-prestacion.component';

describe('StepDetallePrestacionComponent', () => {
  let component: StepDetallePrestacionComponent;
  let fixture: ComponentFixture<StepDetallePrestacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepDetallePrestacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepDetallePrestacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
