import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RmsDashboardComponent } from './rms-dashboard.component';

describe('RmsDashboardComponent', () => {
  let component: RmsDashboardComponent;
  let fixture: ComponentFixture<RmsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RmsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RmsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
