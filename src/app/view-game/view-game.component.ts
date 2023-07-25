import { Component } from '@angular/core';
import { GamesService } from '../games/games.service';
import { Game } from '../games/game';
import { ActivatedRoute } from '@angular/router';
import { SaveSlot } from '../games/save-slot';
import { SaveSlotType } from '../games/save-slot-type';
import { Save } from '../games/save';
import { EditGamePath } from '../app-configuration';

@Component({
  selector: 'app-view-game',
  templateUrl: './view-game.component.html',
  styleUrls: ['./view-game.component.css']
})
export class ViewGameComponent {
  game: Game | undefined;
  editGamePath = EditGamePath;

  constructor(private route: ActivatedRoute, private gamesService: GamesService) {

  }

  ngOnInit() {
    const gameId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.gamesService.getGame(gameId).subscribe(game => {
      this.game = game;
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
