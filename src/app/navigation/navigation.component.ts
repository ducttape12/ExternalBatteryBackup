import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AddGamePath, ViewGamePath, ViewGameTitle, AddGameTitle, ApplicationTitle, GamesListPath }
  from '../route-constants'

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  navEnd: Observable<NavigationEnd>;
  router: Router;
  navigationTitle: string = '';
  displayBackButton: boolean = false;
  backButtonRouterLink: string = '';

  constructor(router: Router) {
    this.navEnd = router.events.pipe(
      filter(evt => evt instanceof NavigationEnd)
    ) as Observable<NavigationEnd>;

    this.router = router;
  }

  ngOnInit() {
    this.navEnd.subscribe(() => {
      console.log(`Navigated to new URL ${this.router.url}`);

      if (this.router.url.includes(AddGamePath)) {
        this.navigationTitle = AddGameTitle;
        this.displayBackButton = true;
        this.backButtonRouterLink = GamesListPath;

      } else if (this.router.url.includes(ViewGamePath)) {
        this.navigationTitle = ViewGameTitle;
        this.displayBackButton = true;
        this.backButtonRouterLink = GamesListPath;

      } else {
        this.navigationTitle = ApplicationTitle;
        this.displayBackButton = false;
        this.backButtonRouterLink = '';
      }



    });
  }

}