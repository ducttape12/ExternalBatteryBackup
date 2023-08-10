import { Component } from '@angular/core';
import { GamesService } from '../games/games.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  jsonExport = '';
  fileNameTimestamp = '';

  constructor(private gamesService: GamesService) { }

  ngOnInit() {
    this.gamesService.getGames().subscribe(games => {
      this.jsonExport = encodeURIComponent(JSON.stringify(games));
      this.fileNameTimestamp = this.getFileNameTimestamp();
    });
  }

  getFileNameTimestamp() {
    const date = new Date();
    return `${date.getFullYear()}${this.pad(date.getMonth() + 1)}${this.pad(date.getDate())}` +
      `-${this.pad(date.getHours())}${this.pad(date.getMinutes())}`;
  }

  pad(value: number) {
    return value.toString().padStart(2, '0');
  }
}