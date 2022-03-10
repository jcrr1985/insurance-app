import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputCustomDsComponent } from './input-custom-ds.component';

describe('InputCustomDsComponent', () => {
  let component: InputCustomDsComponent;
  let fixture: ComponentFixture<InputCustomDsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputCustomDsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputCustomDsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
