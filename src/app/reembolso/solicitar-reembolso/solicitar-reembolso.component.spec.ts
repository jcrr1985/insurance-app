import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarReembolsoComponent } from './solicitar-reembolso.component';

describe('SolicitarReembolsoComponent', () => {
  let component: SolicitarReembolsoComponent;
  let fixture: ComponentFixture<SolicitarReembolsoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitarReembolsoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitarReembolsoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
