import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaMobileComponent } from './tabla-mobile.component';

describe('TablaMobileComponent', () => {
  let component: TablaMobileComponent;
  let fixture: ComponentFixture<TablaMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaMobileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
