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
  selectedFile: File | undefined;

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

  onFileSelected(fileEvent: any) {
    this.selectedFile = fileEvent.target.files[0];

  }

  importData() {
    if(this.selectedFile != undefined) {
      const reader = new FileReader();
      reader.addEventListener('load', (loadEvent) => {
        const json = loadEvent.target?.result;
  
        if (typeof (json) === 'string') {
          this.gamesService.importSaveGames(json);
          alert('Data imported successfully');
          this.selectedFile = undefined;
        } else {
          throw Error('Unable to load and import data');
        }
      });
  
      reader.readAsText(this.selectedFile);
    }
  }
}