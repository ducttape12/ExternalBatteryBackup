import { Injectable } from '@angular/core';
import { Game } from './game';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  constructor() { }

  getGames(): Game[] {
    return [
      new Game('Ms. Pac-Man', 'Game Boy'),
      new Game('Tetris', 'Game Boy')
    ];
  }
}
