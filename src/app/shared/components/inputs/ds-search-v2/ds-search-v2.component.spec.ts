import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsSearchV2Component } from './ds-search-v2.component';

describe('DsSearchV2Component', () => {
  let component: DsSearchV2Component;
  let fixture: ComponentFixture<DsSearchV2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DsSearchV2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DsSearchV2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
