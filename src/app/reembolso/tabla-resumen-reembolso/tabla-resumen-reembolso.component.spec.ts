import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaResumenReembolsoComponent } from './tabla-resumen-reembolso.component';

describe('TablaResumenReembolsoComponent', () => {
  let component: TablaResumenReembolsoComponent;
  let fixture: ComponentFixture<TablaResumenReembolsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaResumenReembolsoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaResumenReembolsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
