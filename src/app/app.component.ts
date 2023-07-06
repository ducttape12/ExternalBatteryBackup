import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  navEnd: Observable<NavigationEnd>;
  router: Router;

  constructor(router: Router) {
    this.navEnd = router.events.pipe(
      filter(evt => evt instanceof NavigationEnd)
    ) as Observable<NavigationEnd>;

    this.router = router;
  }

  ngOnInit() {
    this.navEnd.subscribe(() => {
      // TODO: Move this into a separate component that controls the navigation bar
      console.log(`Navigated to new URL ${this.router.url}`);
    });

  }
}
