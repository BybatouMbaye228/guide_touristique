import { TestBed } from '@angular/core/testing';
import { GuideTouristiqueService } from './guide-touristique.service';

describe('GuideTouristiqueService', () => {
  let service: GuideTouristiqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuideTouristiqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
