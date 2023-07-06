import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSaveSlotComponent } from './edit-save-slot.component';

describe('EditSaveSlotComponent', () => {
  let component: EditSaveSlotComponent;
  let fixture: ComponentFixture<EditSaveSlotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditSaveSlotComponent]
    });
    fixture = TestBed.createComponent(EditSaveSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
