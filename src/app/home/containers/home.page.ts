import { ChangeDetectionStrategy, Component, OnDestroy, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IonContent, Platform } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { fromTranslation, TranslationActions } from '@traductorApp/shared/translation';
import { gotToTop, trackById } from '@traductorApp/shared/utils/helpers/functions';
import { Subject } from 'rxjs';
import { map, takeUntil, tap } from 'rxjs/operators';
import { Keyboard } from '@capacitor/keyboard';


@Component({
  selector: 'app-home',
  template:`
    <ion-content >
      <div class="container components-color-second">

        <!-- HEMPY HEADER  -->
        <div class="empty-header">
        </div>

        <ng-container *ngIf="(status$ | async) as status">
          <ng-container *ngIf="status !== 'pending' ; else loader">
            <ng-container *ngIf="status !== 'error' ; else serverError">
              <ng-container *ngIf="(languages$ | async) as languages">

                <form [formGroup]="formTranslate" (submit)="submit($event)">
                  <ion-item lines="none" class="item-select font-medium margin-top-30">
                    <ion-label>{{'COMMON.TRANSLATE_FROM' | translate}}</ion-label>
                    <ion-select formControlName="source" [value]="formTranslate?.get('q')" interface="action-sheet">
                      <ion-select-option *ngFor="let filter of languages; trackBy: trackById" [value]="filter?.language">{{ filter?.label | translate }}</ion-select-option>
                    </ion-select>
                  </ion-item>

                  <ion-textarea
                    formControlName="q"
                    rows="7"
                    [placeholder]="'COMMON.PUT_TEXT' | translate">
                  </ion-textarea>

                  <ion-item lines="none" class="item-select font-medium margin-top">
                    <ion-label>{{'COMMON.TRANSLATE_TO' | translate}}</ion-label>
                    <ion-select formControlName="target" interface="action-sheet">
                      <ion-select-option *ngFor="let filter of languages; trackBy: trackById" [value]="filter?.language">{{ filter?.label | translate }}</ion-select-option>
                    </ion-select>
                  </ion-item>

                  <ng-container *ngIf="(info$ |async) as info">
                    <ion-textarea
                      disabled
                      readonly
                      rows="7"
                      [placeholder]="'COMMON.TRANSLATION' | translate"
                      [value]="info?.translatedText">
                    </ion-textarea>
                  </ng-container>

                  <div class="displays-center margin-top-30">
                    <ion-button
                      [disabled]="formTranslate.disabled"
                      type="submit"
                      class="width-40 mediun-size heigth-min"
                      shape="round" >
                      {{ 'COMMON.TRANSLATE' | translate }}
                    </ion-button>
                  </div>
                </form>

              </ng-container>
            </ng-container>
          </ng-container>
        </ng-container>

        <!-- REFRESH -->
        <ion-refresher slot="fixed" (ionRefresh)="doRefresh($event)">
          <ion-refresher-content></ion-refresher-content>
        </ion-refresher>

        <!-- IS ERROR -->
        <ng-template #serverError>
          <div class="error-serve">
            <div>
              <span><ion-icon class="text-color-dark big-size" name="cloud-offline-outline"></ion-icon></span>
              <br>
              <span class="text-color-dark">{{'COMMON.ERROR' | translate}}</span>
            </div>
          </div>
        </ng-template>

        <!-- IS NO DATA  -->
        <ng-template #noData>
          <div class="error-serve">
            <span class="text-color-dark">{{'COMMON.NORESULT' | translate}}</span>
          </div>
        </ng-template>

        <!-- LOADER  -->
        <ng-template #loader>
          <ion-spinner class="loadingspinner"></ion-spinner>
        </ng-template>
      </div>

      <!-- TO TOP BUTTON  -->
       <ion-fab *ngIf="showButton" vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button class="color-button color-button-text" (click)="gotToTop(content)"> <ion-icon name="arrow-up-circle-outline"></ion-icon></ion-fab-button>
      </ion-fab>

    </ion-content>
  `,
  styleUrls: ['./home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage implements OnDestroy{

  gotToTop = gotToTop;
  trackById = trackById;
  @ViewChild(IonContent, {static: true}) content: IonContent
  showButton: boolean = false;
  private _ngOnSubscribe = new Subject<void>();

  formTranslate: FormGroup = new FormGroup({ // FORM
    q: new FormControl(''), //texto
    target: new FormControl('en'), //al
    source: new FormControl('es'),//del
  });

  formStatus$ = this.store.select(fromTranslation.getFormStatus).pipe(
    takeUntil(this._ngOnSubscribe),
    tap(status => {
      const data = status !== 'pending' ? 'enable' : 'disable';
      this.formTranslate[data]();
    })
  ).subscribe();  //FORM STATUS


  status$ = this.store.select(fromTranslation.getStatus); //STATUS
  languages$ = this.store.select(fromTranslation.getLanguages); // LANGUAGES

  info$ = this.store.select(fromTranslation.getResult).pipe( // RESULT
    map(result => ({translatedText: result?.translatedText || ''}))
  );


  constructor(
    private store: Store,
    public platform: Platform
  ) { }


  ngOnDestroy(): void{
    this._ngOnSubscribe.next();
    this._ngOnSubscribe.complete();
  }

  submit(event): void{
    event.preventDefault();
    if(!this.platform.is('mobileweb')) Keyboard.hide();
    const obj = {...this.formTranslate.value}
    if(obj?.q){
      this.store.dispatch(TranslationActions.loadTranslation({obj}))
    }
  }

  // REFRESH
  doRefresh(event) {
    setTimeout(() => {
      this.formTranslate.reset();
      this.formTranslate.patchValue({target: 'en', source:'es'});
      this.store.dispatch(TranslationActions.deleteTranslation());
      event.target.complete();
    }, 500);
  }


}
