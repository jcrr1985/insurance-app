import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestacionTarjetaComponent } from './prestacion-tarjeta.component';

describe('PrestacionTarjetaComponent', () => {
  let component: PrestacionTarjetaComponent;
  let fixture: ComponentFixture<PrestacionTarjetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrestacionTarjetaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrestacionTarjetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
