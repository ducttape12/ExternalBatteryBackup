import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameListComponent } from './game-list/game-list.component';
import { AddGameComponent } from './add-game/add-game.component';
import { ViewGameComponent } from './view-game/view-game.component';
import { EditGameComponent } from './edit-game/edit-game.component';
import {
  ApplicationTitle, GamesListPath, AddGamePath, ViewGamePathFull, AddGameTitle,
  ViewGameTitle, GamesListTitle, EditGamePathFull, EditGameTitle, AboutPath, AboutTitle, SettingsPath,
  SettingsTitle
} from './app-configuration'
import { AboutComponent } from './about/about.component';
import { SettingsComponent } from './settings/settings.component';

function GeneratePageTitle(title: string): string {
  return `${ApplicationTitle} | ${title}`;
}

const routes: Routes = [
  { path: AddGamePath, component: AddGameComponent, title: GeneratePageTitle(AddGameTitle) },
  { path: ViewGamePathFull, component: ViewGameComponent, title: GeneratePageTitle(ViewGameTitle) },
  { path: EditGamePathFull, component: EditGameComponent, title: GeneratePageTitle(EditGameTitle) },
  { path: GamesListPath, component: GameListComponent, title: GeneratePageTitle(GamesListTitle) },
  { path: AboutPath, component: AboutComponent, title: GeneratePageTitle(AboutTitle) },
  { path: SettingsPath, component: SettingsComponent, title: GeneratePageTitle(SettingsTitle) },
  { path: '**', redirectTo: GamesListPath, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
