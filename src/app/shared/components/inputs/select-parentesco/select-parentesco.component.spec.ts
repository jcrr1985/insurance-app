import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectParentescoComponent } from './select-parentesco.component';

describe('SelectParentescoComponent', () => {
  let component: SelectParentescoComponent;
  let fixture: ComponentFixture<SelectParentescoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectParentescoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectParentescoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
