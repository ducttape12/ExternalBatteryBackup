import { Component } from '@angular/core';
import { GamesService } from '../games/games.service';
import { Game } from '../games/game';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent {
  gamesList: Game[] = [];
  searchTerm: string = '';

  constructor(private gamesService: GamesService) {
    this.resetFilter();
  }

  resetFilter() {
    this.searchTerm = '';
    this.gamesList = this.gamesService.getGames();
  }

  performSearch() {
    if (this.searchTerm === '') {
      this.resetFilter();
      return;
    }

    const lowerSearchTerm = this.searchTerm.toLocaleLowerCase();

    this.gamesList = this.gamesService.getGames().filter(g => g.title.toLocaleLowerCase().startsWith(lowerSearchTerm));
  }
}
