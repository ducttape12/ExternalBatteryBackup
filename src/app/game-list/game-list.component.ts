import { Component } from '@angular/core';
import { GamesService } from '../games/games.service';
import { FormControl } from '@angular/forms';
import { Game } from '../games/game';
import { ViewGamePath } from '../app-configuration';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent {
  gamesList: Game[] = []
  filteredGames: Game[] = [];
  searchTerm = new FormControl('');
  viewGamePath = ViewGamePath;

  constructor(private gamesService: GamesService) {
  }

  ngOnInit() {
    this.gamesService.getGames().subscribe(games => this.gamesList = games);
    this.searchTerm.setValue('');
    this.resetFilter();

    this.searchTerm.valueChanges.subscribe(value => {
      this.filterGamesList();
    });
  }

  resetFilter() {
    this.filteredGames = Object.assign([], this.gamesList);
  }

  filterGamesList() {
    if (this.searchTerm === null || this.searchTerm.value === null || this.searchTerm.value.trim() === '') {
      this.resetFilter();
      return;
    }

    const lowerSearchTerm = this.searchTerm.value!.trim().toLocaleLowerCase();

    this.filteredGames = this.gamesList.filter(g => g.title.toLocaleLowerCase().startsWith(lowerSearchTerm));
  }
}
