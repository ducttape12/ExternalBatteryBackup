import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSaveComponent } from './add-save.component';

describe('AddSaveComponent', () => {
  let component: AddSaveComponent;
  let fixture: ComponentFixture<AddSaveComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSaveComponent]
    });
    fixture = TestBed.createComponent(AddSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
