import { TestBed } from '@angular/core/testing';

import { AlertaFileService } from './alerta-file.service';

describe('AlertaFileService', () => {
  let service: AlertaFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlertaFileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
