import { TestBed, inject } from '@angular/core/testing';

import { NotificateService } from './notificate.service';

describe('NotificateService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificateService]
    });
  });

  it('should be created', inject([NotificateService], (service: NotificateService) => {
    expect(service).toBeTruthy();
  }));
});
