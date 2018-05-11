import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmsDashboardComponent } from './ems-dashboard.component';

describe('EmsDashboardComponent', () => {
  let component: EmsDashboardComponent;
  let fixture: ComponentFixture<EmsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
