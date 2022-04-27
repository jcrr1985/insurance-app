import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamenesYProcedimientosComponent } from './examenes-y-procedimientos.component';

describe('ExamenesYProcedimientosComponent', () => {
  let component: ExamenesYProcedimientosComponent;
  let fixture: ComponentFixture<ExamenesYProcedimientosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExamenesYProcedimientosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamenesYProcedimientosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
