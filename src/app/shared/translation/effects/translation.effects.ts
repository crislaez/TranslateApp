import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NotificationActions } from '@traductorApp/shared/notification';
import { EntityStatus } from '@traductorApp/shared/utils/helpers/functions';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as TranslationActions from '../actions/translation.actions';
import { TranslationService } from '../services/translation.service';


@Injectable()
export class TranslationEffects {

  loadSupportLanguages$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TranslationActions.loadSupportLanguages),
      switchMap(() => {
        return this._translation.getSupportLanguajes().pipe(
          map((languages) => TranslationActions.saveSupportLanguages({ languages, error:undefined, status:EntityStatus.Loaded }) ),
          catchError(error => {
            return of(
              TranslationActions.saveSupportLanguages({ languages:null, error, status:EntityStatus.Error }),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_LANGUAJES'})
            )
          })
        )
      })
    )
  });

  loadTranslation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(TranslationActions.loadTranslation),
      switchMap(({ obj }) => {
        return this._translation.getTranslation(obj).pipe(
          map((result) => {
            const { target = null, q = null, source = null } = obj || {}
            const updateResult = { ...result, target, textToTranslate: q, source }
            return TranslationActions.saveTranslation({ result: updateResult, error:undefined, status:EntityStatus.Loaded })
          }),
          catchError(error => {
            return of(
              TranslationActions.saveTranslation({ result:null, error, status:EntityStatus.Error }),
              NotificationActions.notificationFailure({message: 'ERRORS.ERROR_LOAD_TRANSLATE'})
            )
          })
        )
      })
    )
  });

  tryLoadUpportLanguajes$ = createEffect(() => {
    return of(
      // TranslationActions.loadAuth(),
      TranslationActions.loadSupportLanguages()
      )
  });



  constructor(
    private actions$: Actions,
    private _translation: TranslationService,
    public toastController: ToastController,
  ) { }


}
