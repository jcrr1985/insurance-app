import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepQuienSeAtendioComponent } from './step-quien-se-atendio.component';

describe('StepQuienSeAtendioComponent', () => {
  let component: StepQuienSeAtendioComponent;
  let fixture: ComponentFixture<StepQuienSeAtendioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepQuienSeAtendioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepQuienSeAtendioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
