import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSaveSlotComponent } from './new-save-slot.component';

describe('NewSaveSlotComponent', () => {
  let component: NewSaveSlotComponent;
  let fixture: ComponentFixture<NewSaveSlotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewSaveSlotComponent]
    });
    fixture = TestBed.createComponent(NewSaveSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
