import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepDocumentosGeneralesComponent } from './step-documentos-generales.component';

describe('StepdocumentosGeneralesComponent', () => {
  let component: StepDocumentosGeneralesComponent;
  let fixture: ComponentFixture<StepDocumentosGeneralesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StepDocumentosGeneralesComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepDocumentosGeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
