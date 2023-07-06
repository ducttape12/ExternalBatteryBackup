import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIconsModule } from '@ng-icons/core';
import { bootstrapXCircle, bootstrapBatteryCharging } from '@ng-icons/bootstrap-icons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GameListComponent } from './game-list/game-list.component';
import { AddGameComponent } from './add-game/add-game.component';
import { ViewGameComponent } from './view-game/view-game.component';

@NgModule({
  declarations: [
    AppComponent,
    GameListComponent,
    AddGameComponent,
    ViewGameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    NgIconsModule.withIcons({ bootstrapXCircle, bootstrapBatteryCharging }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
