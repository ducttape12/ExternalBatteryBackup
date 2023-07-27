import { Component, Input, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GamesService } from '../games/games.service';
import { GamesListPath } from '../app-configuration';

@Component({
  selector: 'app-delete-game',
  templateUrl: './delete-game.component.html',
  styleUrls: ['./delete-game.component.css']
})
export class DeleteGameComponent {
  @Input() gameId: number = 0;

  constructor(private gamesService: GamesService, private modalService: NgbModal,
    private router: Router) {
  }

  openModal(content: TemplateRef<any>) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
      () => {
        this.gamesService.deleteGame(this.gameId as number);
        this.router.navigate([GamesListPath]);
      },
      () => { },
    );
  }
}
