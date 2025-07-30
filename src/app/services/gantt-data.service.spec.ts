import { TestBed } from '@angular/core/testing';

import { GanttDataService } from './gantt-data.service';

describe('GanttDataService', () => {
  let service: GanttDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GanttDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
