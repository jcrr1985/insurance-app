import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtencionHospitalariaComponent } from './atencion-hospitalaria.component';

describe('AtencionHospitalariaComponent', () => {
  let component: AtencionHospitalariaComponent;
  let fixture: ComponentFixture<AtencionHospitalariaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtencionHospitalariaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtencionHospitalariaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
