import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideOutMenuComponent } from './slide-out-menu.component';

describe('SlideOutMenuComponent', () => {
  let component: SlideOutMenuComponent;
  let fixture: ComponentFixture<SlideOutMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SlideOutMenuComponent]
    });
    fixture = TestBed.createComponent(SlideOutMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
