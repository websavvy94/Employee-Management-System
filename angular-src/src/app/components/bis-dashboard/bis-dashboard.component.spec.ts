import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BisDashboardComponent } from './bis-dashboard.component';

describe('BisDashboardComponent', () => {
  let component: BisDashboardComponent;
  let fixture: ComponentFixture<BisDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BisDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BisDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
