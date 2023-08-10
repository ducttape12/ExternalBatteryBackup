import { Component, TemplateRef } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { AboutPath, ApplicationTitle, SettingsPath } from '../app-configuration';

@Component({
  selector: 'app-slide-out-menu',
  templateUrl: './slide-out-menu.component.html',
  styleUrls: ['./slide-out-menu.component.css']
})
export class SlideOutMenuComponent {
  applicationTitle = ApplicationTitle;
  aboutPath = AboutPath;
  settingsPath = SettingsPath;

  constructor(private offcanvasService: NgbOffcanvas) {
  }

  openMenu(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { ariaLabelledBy: 'offcanvas-basic-title' }).result.then(
      () => { },
      () => { },
    );
  }
}
