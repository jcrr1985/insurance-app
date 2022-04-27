import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtencionDentalComponent } from './atencion-dental.component';

describe('AtencionDentalComponent', () => {
  let component: AtencionDentalComponent;
  let fixture: ComponentFixture<AtencionDentalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtencionDentalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtencionDentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
