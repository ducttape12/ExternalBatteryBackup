import { Component } from '@angular/core';
import { GamesService } from '../games/games.service';
import { Game } from '../games/game';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
  selector: 'app-view-game',
  templateUrl: './view-game.component.html',
  styleUrls: ['./view-game.component.css']
})
export class ViewGameComponent {
  game: Game | undefined;

  constructor(private route: ActivatedRoute, private router: Router, private gamesService: GamesService) {

  }

  ngOnInit() {
    const gameId = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
    this.gamesService.getGame(gameId).subscribe(game => this.game = game);
  }
}
