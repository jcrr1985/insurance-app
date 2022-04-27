import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableDetalleReembolsoComponent } from './table-detalle-reembolso.component';

describe('TableDetalleReembolsoComponent', () => {
  let component: TableDetalleReembolsoComponent;
  let fixture: ComponentFixture<TableDetalleReembolsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableDetalleReembolsoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableDetalleReembolsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
