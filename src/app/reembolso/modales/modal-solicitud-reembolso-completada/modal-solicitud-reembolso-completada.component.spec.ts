import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSolicitudReembolsoCompletadaComponent } from './modal-solicitud-reembolso-completada.component';

describe('ModalSolicitudReembolsoCompletadaComponent', () => {
  let component: ModalSolicitudReembolsoCompletadaComponent;
  let fixture: ComponentFixture<ModalSolicitudReembolsoCompletadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalSolicitudReembolsoCompletadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalSolicitudReembolsoCompletadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
