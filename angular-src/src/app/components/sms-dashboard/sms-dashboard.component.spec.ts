import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsDashboardComponent } from './sms-dashboard.component';

describe('SmsDashboardComponent', () => {
  let component: SmsDashboardComponent;
  let fixture: ComponentFixture<SmsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
