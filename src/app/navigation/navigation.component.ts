import { Component, TemplateRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {
  AddGamePath,
  ViewGamePath,
  ViewGameTitle,
  AddGameTitle,
  ApplicationTitle,
  GamesListPath,
  EditGamePath,
  EditGameTitle,
  AboutPath,
  AboutTitle
} from '../app-configuration'
import { NgbOffcanvas, OffcanvasDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  navigationEnd: Observable<NavigationEnd>;
  navigationTitle: string = '';
  displayBackButton: boolean = false;
  backButtonRouterLink: string = '';
  applicationTitle = ApplicationTitle;

  constructor(private router: Router) {
    this.navigationEnd = router.events.pipe(
      filter(evt => evt instanceof NavigationEnd)
    ) as Observable<NavigationEnd>;
  }

  ngOnInit() {
    this.navigationEnd.subscribe((a) => {
      if (this.router.url.includes(AddGamePath)) {
        this.navigationTitle = AddGameTitle;
        this.displayBackButton = true;
        this.backButtonRouterLink = GamesListPath;

      } else if (this.router.url.includes(ViewGamePath)) {
        this.navigationTitle = ViewGameTitle;
        this.displayBackButton = true;
        this.backButtonRouterLink = GamesListPath;

      } else if (this.router.url.includes(EditGamePath)) {
        this.navigationTitle = EditGameTitle;
        this.displayBackButton = true;
        this.backButtonRouterLink = `/${ViewGamePath}/${this.getQueryStringId()}`;

      } else if (this.router.url.includes(AboutPath)) {
        this.navigationTitle = AboutTitle;
        this.displayBackButton = true;
        this.backButtonRouterLink = GamesListPath;

      } else {
        this.navigationTitle = ApplicationTitle;
        this.displayBackButton = false;
        this.backButtonRouterLink = '';
      }
    });
  }

  getQueryStringId() {
    const url = this.router.url;
    const lastSlash = url.lastIndexOf('/');
    const id = url.substring(lastSlash + 1);

    return id;
  }
}