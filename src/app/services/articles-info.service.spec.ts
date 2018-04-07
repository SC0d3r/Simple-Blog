import { TestBed, inject } from '@angular/core/testing';

import { ArticlesInfoService } from './articles-info.service';

describe('ArticlesInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ArticlesInfoService]
    });
  });

  it('should be created', inject([ArticlesInfoService], (service: ArticlesInfoService) => {
    expect(service).toBeTruthy();
  }));
});
