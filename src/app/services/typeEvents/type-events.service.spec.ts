import { TestBed } from '@angular/core/testing';

import { TypeEventsService } from './type-events.service';

describe('TypeEventsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TypeEventsService = TestBed.get(TypeEventsService);
    expect(service).toBeTruthy();
  });
});
