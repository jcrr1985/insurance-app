import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableResumeDetallePrestacionComponent } from './table-resume-detalle-prestacion.component';

describe('TableResumeDetallePrestacionComponent', () => {
  let component: TableResumeDetallePrestacionComponent;
  let fixture: ComponentFixture<TableResumeDetallePrestacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableResumeDetallePrestacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableResumeDetallePrestacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
