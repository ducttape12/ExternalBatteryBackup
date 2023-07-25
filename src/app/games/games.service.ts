import { Injectable } from '@angular/core';
import { Game } from './game';
import { Observable, of } from 'rxjs';
import { SaveSlot } from './save-slot';
import { Save } from './save';
import { SaveSlotType } from './save-slot-type';
import { MaxSavesPerSlot } from '../app-configuration';

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

  getGames(): Observable<Game[]> {
    const gamesCopy: Game[] = [];

    for (let gameOriginal of this.games) {
      const gameCopy = this.deepCopyGame(gameOriginal);
      gamesCopy.push(gameCopy);
    }

    return of(gamesCopy);
  }

  getGame(id: number): Observable<Game> {
    const gameOriginal = this.games.filter(g => g.id === id)[0];
    const gameCopy = this.deepCopyGame(gameOriginal);

    return of(gameCopy);
  }

  private deepCopyGame(gameOriginal: Game) {
    const gameCopy = new Game(gameOriginal.id, gameOriginal.title, gameOriginal.platform,
      gameOriginal.pinnedSaveSlotId);

    for (let saveSlotOriginal of gameOriginal.saveSlots) {
      const saveSlotCopy = this.deepCopySaveSlot(saveSlotOriginal);
      gameCopy.saveSlots.push(saveSlotCopy);
    }

    return gameCopy;
  }

  private deepCopySaveSlot(saveSlotOriginal: SaveSlot) {
    const saveSlotCopy = new SaveSlot(saveSlotOriginal.id, saveSlotOriginal.description, saveSlotOriginal.type);

    for (let saveOriginal of saveSlotOriginal.saves) {
      const saveCopy = new Save(saveOriginal.value, saveOriginal.description, saveOriginal.timestamp);
      saveSlotCopy.saves.push(saveCopy);
    }

    return saveSlotCopy;
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

  addGame(title: string, platform: string, pinnedSaveSlotId: number, saveSlots: SaveSlot[]) {
    const newGame = new Game(this.nextId, title, platform, pinnedSaveSlotId, saveSlots);
    this.games.push(newGame);
    this.nextId++;

    this.sortGames();
    this.saveGames();
  }

  updateGame(gameId: number, title: string, platform: string, saveSlots: SaveSlot[]) {
    const gameIndex = this.games.findIndex(g => g.id === gameId);

    if (gameIndex < 0) {
      throw new Error(`Update Failed.  Cannot find game with ID ${gameId}.`);
    }

    this.games[gameIndex].title = title;
    this.games[gameIndex].platform = platform;
    this.games[gameIndex].saveSlots = saveSlots;

    this.sortGames();
    this.saveGames();
  }

  deleteGame(gameId: number) {
    this.games = this.games.filter(g => g.id !== gameId);

    this.sortGames();
    this.saveGames();
  }

  addSaveToGame(gameId: number, saveSlotId: number, save: Save): Observable<Game> {
    const game = this.games.find(g => g.id === gameId);

    if (game === undefined) {
      throw new Error(`addSaveToGame: Unable to find game with ID ${gameId}`);
    }

    const saveSlot = game.saveSlots.find(s => s.id === saveSlotId);

    if (saveSlot === undefined) {
      throw new Error(`addSaveToGame: Unable to find save slot with Game ID ${gameId}, Save Slot ID ${saveSlotId}`);
    }

    if ((saveSlot.type === SaveSlotType.HighScores && typeof save.value !== 'number')) {
      throw new Error('Attempting to add a highscore with a value that is not a number');
    }

    saveSlot.saves = [save].concat(saveSlot.saves);

    if (saveSlot.type === SaveSlotType.HighScores) {
      saveSlot.saves.sort((a, b) => (b.value as number) - (a.value as number));
    }

    if (saveSlot.saves.length > MaxSavesPerSlot) {
      saveSlot.saves.splice(MaxSavesPerSlot);
    }

    this.saveGames();

    return this.getGame(gameId);
  }
}
