import { TestBed, inject } from '@angular/core/testing';

import { MangeQuestionsService } from './mange-questions.service';

describe('MangeQuestionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MangeQuestionsService]
    });
  });

  it('should be created', inject([MangeQuestionsService], (service: MangeQuestionsService) => {
    expect(service).toBeTruthy();
  }));
});
