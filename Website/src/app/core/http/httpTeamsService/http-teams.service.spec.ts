import { TestBed } from '@angular/core/testing';

import { HttpTeamsService } from './http-teams.service';

describe('HttpTeamsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HttpTeamsService = TestBed.get(HttpTeamsService);
    expect(service).toBeTruthy();
  });
});
