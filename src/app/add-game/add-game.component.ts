import { Component } from '@angular/core';
import { GamesService } from '../games/games.service';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GamesListPath } from '../app-configuration';
import { SaveSlot } from '../games/save-slot';
import { SaveSlotType } from '../games/save-slot-type';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent {
  title = new FormControl('', [Validators.required]);
  platform = new FormControl('', [Validators.required]);
  addAttempted = false;
  gamesListPath: string = GamesListPath;
  saveSlots: SaveSlot[] = [];
  nextSaveSlotId: number = 0;
  pinnedSaveSlotId: number = -1;

  constructor(private gamesService: GamesService, private router: Router) { }

  inputIsValid(control: FormControl) {
    return control.invalid && (control.dirty || control.touched || this.addAttempted);
  }

  addGame() {
    this.addAttempted = true;

    if (this.title.valid && this.platform.valid) {
      this.gamesService.addGame(this.title.value!, this.platform.value!, this.pinnedSaveSlotId, this.saveSlots);
      this.router.navigate([GamesListPath]);
    }
  }

  addSaveSlot() {
    this.saveSlots.push(new SaveSlot(this.nextSaveSlotId, '', SaveSlotType.HighScores));
    this.nextSaveSlotId++;
  }

  deleteSaveSlot(saveSlotId: number) {
    const saveSlotIndex = this.saveSlots.findIndex(s => s.id === saveSlotId);
    this.saveSlots.splice(saveSlotIndex, 1);
  }

  pinSaveSlot(saveSlotId: number) {
    if(this.pinnedSaveSlotId === saveSlotId) {
      this.pinnedSaveSlotId = -1;
    } else {
      this.pinnedSaveSlotId = saveSlotId;
    }
  }
}
