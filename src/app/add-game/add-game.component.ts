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
  saveSlotId: number = 0;
  pinnedSlotId: number = 0;

  constructor(private gamesService: GamesService, private router: Router) { }

  inputIsValid(control: FormControl) {
    return control.invalid && (control.dirty || control.touched || this.addAttempted);
  }

  addGame() {
    this.addAttempted = true;

    if (this.title.valid && this.platform.valid) {
      this.gamesService.addGame(this.title.value!, this.platform.value!, this.pinnedSlotId, this.saveSlots);
      this.router.navigate([GamesListPath]);
    }
  }

  addSaveSlot() {
    this.saveSlots.push(new SaveSlot(this.saveSlotId, '', SaveSlotType.HighScores));
    this.saveSlotId++;
  }

  deleteSaveSlot(saveSlotId: number) {
    const saveSlotIndex = this.saveSlots.findIndex(s => s.id === saveSlotId);

    this.saveSlots.splice(saveSlotIndex, 1);

    // If deleting a pinned save slot, reassign the pin to the previous save slot
    if (this.pinnedSlotId === saveSlotId) {
      let newPinnedSaveSlotIndex = saveSlotIndex - 1;
      if (newPinnedSaveSlotIndex < 0) {
        newPinnedSaveSlotIndex = 0;
      }

      if(this.saveSlots.length > 0) {
        this.pinnedSlotId = this.saveSlots[newPinnedSaveSlotIndex].id;
      } else {
        // No remaining save slots; the next slot will be automatically pinned
        this.pinnedSlotId = this.saveSlotId;
      }
    }
  }

  pinSaveSlot(saveSlotId: number) {
    this.pinnedSlotId = saveSlotId;
  }
}
