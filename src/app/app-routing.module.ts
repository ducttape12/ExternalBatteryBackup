import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameListComponent } from './game-list/game-list.component';
import { AddGameComponent } from './add-game/add-game.component';
import { ViewGameComponent } from './view-game/view-game.component';

const routes: Routes = [
  { path: 'add-game', component: AddGameComponent, title: "External Battery Backup | Add Game" },
  { path: 'view-game/:id', component: ViewGameComponent, title: "External Battery Backup | View Game" },
  { path: '', component: GameListComponent, title: "External Battery Backup | Home"},
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
