import { Component, EventEmitter, Input, TemplateRef, Output } from '@angular/core';
import { SaveSlotType } from '../games/save-slot-type';
import { Save } from '../games/save';
import { NgbModal, NgbModalRef, NgbCalendar, NgbDateStruct, NgbTimeStruct, NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-save',
  templateUrl: './add-save.component.html',
  styleUrls: ['./add-save.component.css']
})
export class AddSaveComponent {
  @Input() saveType: SaveSlotType = SaveSlotType.HighScores;
  @Input() saveDescription: string | undefined;
  @Output() saveCreated = new EventEmitter<Save>();
  value = new FormControl('', [Validators.required]);
  description = new FormControl('');
  modal: NgbModalRef | undefined;
  addAttempted: boolean = false;
  dateModel: NgbDateStruct | undefined;
  timeModel: NgbTimeStruct | undefined;
  timestamp: Date = new Date();

  constructor(private modalService: NgbModal, private ngbCalendar: NgbCalendar) { }

  ngOnInit() {
    this.resetTimestamp();
  }

  resetTimestamp() {
    this.dateModel = this.ngbCalendar.getToday();
    const currentTimestamp = new Date();
    this.timeModel = {hour: currentTimestamp.getHours(), minute: currentTimestamp.getMinutes(), second: 0};
    this.updateTimestamp();
  }

  getSaveSlotDescription() {
    switch (this.saveType) {
      case SaveSlotType.HighScores:
        return 'High Score';
      case SaveSlotType.Passwords:
        return 'Password';
    }
  }

  getExtendedSaveSlotDescription() {
    let description = this.getSaveSlotDescription();

    if (this.saveDescription !== undefined && this.saveDescription !== '') {
      description = `${description} (${this.saveDescription})`;
    }

    return description;
  }

  getInputType() {
    switch (this.saveType) {
      case SaveSlotType.HighScores:
        return 'number';
      case SaveSlotType.Passwords:
        return 'text';
    }
  }

  inputIsValid(control: FormControl) {
    return control.invalid && (control.dirty || control.touched || this.addAttempted);
  }

  saveModal() {
    if (this.modal !== undefined) {
      this.addAttempted = true;

      if (this.value.valid && this.value.value !== null && this.description.valid) {
        this.modal.close();

        let value: string | number = this.value.value;

        if (this.saveType == SaveSlotType.HighScores) {
          value = Number(value);
        }

        const description = this.description.value ?? '';

        const save = new Save(value, description, this.timestamp = this.timestamp);
        this.saveCreated.emit(save);
      }
    }

  }

  openModel(content: TemplateRef<any>) {
    this.value = new FormControl('', [Validators.required]);
    this.description = new FormControl('');
    this.resetTimestamp();
    this.addAttempted = false;

    this.modal = this.modalService.open(content);
  }

  updateTimestamp() {
    if(this.dateModel === undefined || this.timeModel === undefined) {
      this.timestamp = new Date();
    } else {
      this.timestamp = new Date(this.dateModel!.year, this.dateModel!.month - 1, this.dateModel!.day,
        this.timeModel!.hour, this.timeModel!.minute);
    }
  }
}
