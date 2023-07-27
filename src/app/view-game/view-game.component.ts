import { Component, TemplateRef } from '@angular/core';
import { GamesService } from '../games/games.service';
import { Game } from '../games/game';
import { ActivatedRoute, Router } from '@angular/router';
import { SaveSlot } from '../games/save-slot';
import { SaveSlotType } from '../games/save-slot-type';
import { Save } from '../games/save';
import { EditGamePath } from '../app-configuration';
import { GamesListPath } from '../app-configuration';

@Component({
  selector: 'app-view-game',
  templateUrl: './view-game.component.html',
  styleUrls: ['./view-game.component.css']
})
export class ViewGameComponent {
  game: Game | undefined;
  editGamePath = EditGamePath;
  activeTabId: number = 0;

  constructor(private route: ActivatedRoute, private gamesService: GamesService, private router: Router) {
  }

  ngOnInit() {
    const gameId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.gamesService.getGame(gameId).subscribe(game => {
      this.game = game;

      const pinnedSaveSlotIndex = this.game.saveSlots.findIndex(s => s.id === game.pinnedSaveSlotId);
      this.activeTabId = pinnedSaveSlotIndex >= 0 ? pinnedSaveSlotIndex : 0;
    });
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

  addSave(save: Save, saveSlot: SaveSlot) {
    this.gamesService
      .addSaveToGame(this.game!.id, saveSlot.id, save)
      .subscribe(game => {
        this.game = game;
      });
  }
}
