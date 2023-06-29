import { Component } from '@angular/core';
import { GamesService } from '../games/games.service';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent {
  title = new FormControl('', [Validators.required]);
  platform = new FormControl('', [Validators.required]);
  addAttempted = false;

  constructor(private gamesService: GamesService, private router: Router) { }

  inputIsValid(control: FormControl) {
    return control.invalid  && (control.dirty || control.touched || this.addAttempted);
  }

  addGame() {
    this.addAttempted = true;
    
    if(this.title.valid && this.platform.valid) {
      this.gamesService.addGame(this.title.value!, this.platform.value!);
      this.router.navigate(['/']);
    }
  }
}
