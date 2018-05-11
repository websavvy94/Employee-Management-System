import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmsHeaderComponent } from './ems-header.component';

describe('EmsHeaderComponent', () => {
  let component: EmsHeaderComponent;
  let fixture: ComponentFixture<EmsHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmsHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
