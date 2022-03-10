import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePrestacionComponent } from './detalle-prestacion.component';

describe('DetallePrestacionComponent', () => {
  let component: DetallePrestacionComponent;
  let fixture: ComponentFixture<DetallePrestacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallePrestacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallePrestacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
