import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompraMedicamentosComponent } from './compra-medicamentos.component';

describe('CompraMedicamentosComponent', () => {
  let component: CompraMedicamentosComponent;
  let fixture: ComponentFixture<CompraMedicamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompraMedicamentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompraMedicamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
