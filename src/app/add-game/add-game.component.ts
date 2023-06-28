import { Component } from '@angular/core';
import { GamesService } from '../games/games.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent {
  title = new FormControl('', [Validators.required]);
  platform = new FormControl('', [Validators.required]);
  addAttempted = false;

  constructor(gamesService: GamesService) { }

  inputIsValid(control: FormControl) {
    return control.invalid  && (control.dirty || control.touched || this.addAttempted);
  }

  addGame() {
    this.addAttempted = true;
    console.log(`Title rawValue: ${this.title.getRawValue()}, invalid? ${this.title.invalid}`);
    console.log(`Platform rawValue: ${this.platform.getRawValue()}, invalid? ${this.platform.invalid}`);
  }
}
