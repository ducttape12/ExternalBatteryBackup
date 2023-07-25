import { Component } from '@angular/core';
import { GamesService } from '../games/games.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { SaveSlot } from '../games/save-slot';
import { SaveSlotType } from '../games/save-slot-type';
import { EditGamePath } from '../app-configuration';
import { FormControl, Validators } from '@angular/forms';
import { ViewGamePath } from '../app-configuration';

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrls: ['./edit-game.component.css']
})
export class EditGameComponent {
  id = 0;
  editGamePath = EditGamePath;
  title = new FormControl('', [Validators.required]);
  platform = new FormControl('', [Validators.required]);
  addAttempted = false;
  viewGamePath: string = ViewGamePath;

  existingSaveSlots: SaveSlot[] = [];
  existingSaveSlotIdsToDelete: number[] = [];

  newSaveSlots: SaveSlot[] = [];

  saveSlotId: number = 0;

  constructor(private route: ActivatedRoute, private gamesService: GamesService, private router: Router) {

  }

  ngOnInit() {
    const gameId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.gamesService.getGame(gameId).subscribe(game => {
      this.id = game.id;
      this.title.setValue(game.title);
      this.platform.setValue(game.platform);

      let maxId = 0;
      for (let saveSlot of game.saveSlots) {
        if (saveSlot.id > maxId) {
          maxId = saveSlot.id;
        }
      }

      this.saveSlotId = maxId;

      this.existingSaveSlots = game.saveSlots;
    });
  }

  inputIsValid(control: FormControl) {
    return control.invalid && (control.dirty || control.touched || this.addAttempted);
  }

  getSaveSlotDescription(saveSlot: SaveSlot) {
    let description = '';

    if (saveSlot.type === SaveSlotType.HighScores) {
      description = 'High Scores';
    } else if (saveSlot.type === SaveSlotType.Passwords) {
      description = 'Passwords';
    }

    if (saveSlot.description !== '') {
      description = `${description} (${saveSlot.description})`;
    }

    return description;
  }

  addSaveSlot() {
    this.newSaveSlots.push(new SaveSlot(this.saveSlotId, '', SaveSlotType.HighScores));
    this.saveSlotId++;
  }

  deleteNewSaveSlot(saveSlotId: number) {
    const saveSlotIndex = this.newSaveSlots.findIndex(s => s.id === saveSlotId);
    this.newSaveSlots.splice(saveSlotIndex, 1);
  }

  deleteExistingSaveSlot(saveSlotId: number) {
    this.existingSaveSlotIdsToDelete.push(saveSlotId);
  }

  undeleteExistingSaveSlot(saveSlotId: number) {
    const index = this.existingSaveSlotIdsToDelete.indexOf(saveSlotId);

    if (index > -1) {
      this.existingSaveSlotIdsToDelete.splice(index, 1);
    }
  }

  saveChanges() {
    this.addAttempted = true;

    if (this.title.valid && this.platform.valid) {
      const saveSlots =
        this.existingSaveSlots.filter(s => !this.existingSaveSlotIdsToDelete.includes(s.id))
          .concat(this.newSaveSlots);

      this.gamesService.updateGame(this.id, this.title.value!, this.platform.value!, saveSlots);
      this.router.navigate([this.getViewGamePath()]);
    }
  }

  getViewGamePath() {
    return `/${this.viewGamePath}/${this.id}`;
  }
}