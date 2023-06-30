import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIconsModule } from '@ng-icons/core';
import { bootstrapXCircle } from '@ng-icons/bootstrap-icons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GameListComponent } from './game-list/game-list.component';
import { AddGameComponent } from './add-game/add-game.component';

@NgModule({
  declarations: [
    AppComponent,
    GameListComponent,
    AddGameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgIconsModule.withIcons({ bootstrapXCircle }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
