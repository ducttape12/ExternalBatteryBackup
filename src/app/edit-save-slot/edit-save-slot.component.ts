import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SaveSlotType } from '../games/save-slot-type';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-save-slot',
  templateUrl: './edit-save-slot.component.html',
  styleUrls: ['./edit-save-slot.component.css']
})
export class EditSaveSlotComponent {
  @Input() title: string = '';
  @Output() titleChange = new EventEmitter<string>();
  titleFormControl = new FormControl('');

  @Input() type: SaveSlotType = SaveSlotType.HighScores;
  @Output() typeChange = new EventEmitter<SaveSlotType>();

  @Input() id: number = 0;

  @Output() delete = new EventEmitter<number>();

  @Output() undelete = new EventEmitter<number>();

  @Input() isPinned: boolean = false;
  @Output() pin = new EventEmitter<any>();

  markedForDeletion: boolean = false;
  
  saveSlotTypeFormControl = new FormControl({value: 'highscores', disabled: true});

  ngOnInit() {
    this.titleFormControl.setValue(this.title);

    this.titleFormControl.valueChanges.subscribe(val => {
      this.titleChange.emit(val!);
    });

    this.saveSlotTypeFormControl.valueChanges.subscribe(val => {
      if(val === 'highscores') {
        this.type = SaveSlotType.HighScores;
      } else if (val === 'passwords') {
        this.type = SaveSlotType.Passwords;
      }
      this.typeChange.emit(this.type);
    });

    if(this.type === SaveSlotType.HighScores) {
      this.saveSlotTypeFormControl.setValue('highscores');
    } else if (this.type == SaveSlotType.Passwords) {
      this.saveSlotTypeFormControl.setValue('passwords');
    }
  }

  deleteSlot() {
    if(this.markedForDeletion) {
      this.undelete.emit(this.id);
    } else {
      this.delete.emit(this.id);
    }

    this.markedForDeletion = !this.markedForDeletion;
  }

  getSaveSlotDescription() {
    let description = '';

    if (this.type === SaveSlotType.HighScores) {
      description = 'High Scores';
    } else if (this.type === SaveSlotType.Passwords) {
      description = 'Passwords';
    }

    if (this.titleFormControl.getRawValue() !== '') {
      description = `${description} (${this.titleFormControl.getRawValue()})`;
    }

    return description;
  }

  pinSaveSlot() {
    this.pin.emit(this.id);
  }
}
