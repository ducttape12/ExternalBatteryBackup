import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { SaveSlotType } from '../games/save-slot-type';

@Component({
  selector: 'app-new-save-slot',
  templateUrl: './new-save-slot.component.html',
  styleUrls: ['./new-save-slot.component.css']
})
export class NewSaveSlotComponent {
  @Input() title: string = '';
  @Output() titleChange = new EventEmitter<string>();
  titleFormControl = new FormControl('');

  @Input() type: SaveSlotType = SaveSlotType.HighScores;
  @Output() typeChange = new EventEmitter<SaveSlotType>();

  @Input() id: number = 0;

  @Output() delete = new EventEmitter<number>();
  
  saveSlotTypeFormControl = new FormControl('highscores');

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
    this.delete.emit(this.id);
  }
}
