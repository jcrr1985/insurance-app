import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarcosYLentesComponent } from './marcos-y-lentes.component';

describe('MarcosYLentesComponent', () => {
  let component: MarcosYLentesComponent;
  let fixture: ComponentFixture<MarcosYLentesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarcosYLentesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcosYLentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
