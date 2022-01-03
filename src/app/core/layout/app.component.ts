import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template:`
    <ion-app >

    <!-- HEADER  -->
    <ion-header class="ion-no-border">
      <ion-toolbar mode="md|ios">
        <ion-title class="text-color-light" >{{'COMMON.TITLE' | translate}}</ion-title>
      </ion-toolbar>
    </ion-header>

      <!-- MENU LATERAL  -->
      <!-- <ion-menu side="start" menuId="first" contentId="main">
        <ion-header>
          <ion-toolbar >
            <ion-title class="text-color-light" >{{ 'COMMON.MENU' | translate}}</ion-title>
          </ion-toolbar>
        </ion-header>

        <ion-content >
          <ion-item class="text-second-color" *ngFor="let item of lateralMenu;  trackBy: trackById" [routerLink]="['/'+item?.link]" (click)="openEnd()">{{ item?.text | translate }}</ion-item>
        </ion-content >
      </ion-menu> -->

      <!-- RUTER  -->
      <ion-router-outlet id="main"></ion-router-outlet>

      <!-- TAB FOOTER  -->
      <!-- <ion-tabs >
        <ion-tab-bar  [translucent]="true" slot="bottom">
          <ion-tab-button class="text-color-light" [routerLink]="['jobs']">
          <ion-icon name="bag-outline"></ion-icon>
          </ion-tab-button>

          <ion-tab-button class="text-color-light" [routerLink]="['trainings']">
          <ion-icon name="document-text-outline"></ion-icon>
          </ion-tab-button>

        </ion-tab-bar>
      </ion-tabs> -->
      <!-- <div>Iconos diseñados por <a href="https://www.flaticon.es/autores/flat-icons" title="Flat Icons">Flat Icons</a> from <a href="https://www.flaticon.es/" title="Flaticon">www.flaticon.es</a></div> -->
    </ion-app>
  `,
  styleUrls: ['app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {

  constructor() {}

}
