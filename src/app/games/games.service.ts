import { Injectable } from '@angular/core';
import { Game } from './game';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  private static readonly GamesLocalStorageKey = 'games';

  games: Game[];
  nextId: number;

  constructor() {
    this.games = this.loadGames();

    let id = 0;
    for (let game of this.games) {
      if (game.id > id) {
        id = game.id;
      }
    }

    this.nextId = id + 1;
  }

  getGames(): Game[] {
    return this.games;
  }

  private loadGames(): Game[] {
    const rawGames = localStorage.getItem(GamesService.GamesLocalStorageKey);
    if (rawGames === null) {
      return [];
    }

    try {
      return JSON.parse(rawGames);
    } catch (e) {
      return [];
    }
  }

  private saveGames() {
    const jsonGames = JSON.stringify(this.games);
    localStorage.setItem(GamesService.GamesLocalStorageKey, jsonGames);
  }

  private sortGames() {
    this.games.sort((a, b) => {
      if (a.title < b.title) {
        return -1;
      }

      if (a.title === b.title) {
        return 0;
      }

      return 1;
    });
  }

  addGame(title: string, platform: string) {
    const newGame = new Game(this.nextId, title, platform);
    this.games.push(newGame);
    this.nextId++;

    this.sortGames();
    this.saveGames();
  }

  deleteGame(gameId: number) {
    this.games = this.games.filter(g => g.id != gameId);

    this.sortGames();
    this.saveGames();
  }
}
