import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsSelectV2Component } from './ds-select-v2.component';

describe('DsSelectV2Component', () => {
  let component: DsSelectV2Component;
  let fixture: ComponentFixture<DsSelectV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DsSelectV2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DsSelectV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
