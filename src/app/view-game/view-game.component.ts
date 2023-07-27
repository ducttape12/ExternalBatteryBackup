import { Component, TemplateRef } from '@angular/core';
import { GamesService } from '../games/games.service';
import { Game } from '../games/game';
import { ActivatedRoute, Router } from '@angular/router';
import { SaveSlot } from '../games/save-slot';
import { SaveSlotType } from '../games/save-slot-type';
import { Save } from '../games/save';
import { EditGamePath } from '../app-configuration';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, NgbModalRef, NgbCalendar, NgbDateStruct, NgbTimeStruct, NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
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

  constructor(private route: ActivatedRoute, private gamesService: GamesService, private modalService: NgbModal,
    private router: Router) {
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

  openModal(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      (result) => {
        this.gamesService.deleteGame(this.game?.id as number);
        this.router.navigate([GamesListPath]);
      },
      (reason) => { },
    );
  }
}
