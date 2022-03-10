import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRegistrarMedicamentoComponent } from './modal-registrar-medicamento.component';

describe('ModalRegistrarMedicamentoComponent', () => {
  let component: ModalRegistrarMedicamentoComponent;
  let fixture: ComponentFixture<ModalRegistrarMedicamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalRegistrarMedicamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRegistrarMedicamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
