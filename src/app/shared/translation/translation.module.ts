import { TranslationEffects } from './effects/translation.effects';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationModule } from '../notification/notification.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromTranslation from './reducers/translation.reducer';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NotificationModule,
    StoreModule.forFeature(fromTranslation.translationFeatureKey, fromTranslation.reducer),
    EffectsModule.forFeature([TranslationEffects]),
  ]
})
export class TranslationModule { }
