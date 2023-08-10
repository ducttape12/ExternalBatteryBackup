import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgIconsModule } from '@ng-icons/core';
import {
  bootstrapXCircle,
  bootstrapBatteryCharging,
  bootstrapChevronLeft,
  bootstrapTrash,
  bootstrapPlusSquareDotted,
  bootstrapArrowCounterclockwise,
  bootstrapList,
  bootstrapPinAngle,
  bootstrapPinFill
} from '@ng-icons/bootstrap-icons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { GameListComponent } from './game-list/game-list.component';
import { AddGameComponent } from './add-game/add-game.component';
import { ViewGameComponent } from './view-game/view-game.component';
import { NavigationComponent } from './navigation/navigation.component';
import { EditSaveSlotComponent } from './edit-save-slot/edit-save-slot.component';
import { AddSaveComponent } from './add-save/add-save.component';
import { NewSaveSlotComponent } from './new-save-slot/new-save-slot.component';
import { EditGameComponent } from './edit-game/edit-game.component';
import { DeleteGameComponent } from './delete-game/delete-game.component';
import { SlideOutMenuComponent } from './slide-out-menu/slide-out-menu.component';
import { AboutComponent } from './about/about.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    GameListComponent,
    AddGameComponent,
    ViewGameComponent,
    NavigationComponent,
    EditSaveSlotComponent,
    AddSaveComponent,
    NewSaveSlotComponent,
    EditGameComponent,
    DeleteGameComponent,
    SlideOutMenuComponent,
    AboutComponent,
    SettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    NgIconsModule.withIcons({
      bootstrapXCircle,
      bootstrapBatteryCharging,
      bootstrapChevronLeft,
      bootstrapTrash,
      bootstrapPlusSquareDotted,
      bootstrapArrowCounterclockwise,
      bootstrapList,
      bootstrapPinAngle,
      bootstrapPinFill
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
