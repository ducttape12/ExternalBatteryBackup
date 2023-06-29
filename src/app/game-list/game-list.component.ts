import { Component } from '@angular/core';
import { GamesService } from '../games/games.service';
import { FormControl } from '@angular/forms';
import { Game } from '../games/game';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent {
  gamesList: Game[] = [];
  searchTerm = new FormControl('');

  constructor(private gamesService: GamesService) {
    this.resetFilter();
  }

  resetFilter() {
    this.searchTerm.setValue('');
    this.gamesList = this.gamesService.getGames();
  }

  ngOnInit() {
    this.searchTerm.valueChanges.subscribe(value => {
      this.filterGamesList();
    });
  }

  filterGamesList() {
    if (this.searchTerm === null || this.searchTerm.value === null || this.searchTerm.value.trim() === '') {
      this.gamesList = this.gamesService.getGames();
      return;
    }

    const lowerSearchTerm = this.searchTerm.value!.toLocaleLowerCase();

    this.gamesList = this.gamesService.getGames().filter(g => g.title.toLocaleLowerCase().startsWith(lowerSearchTerm));
  }
}
