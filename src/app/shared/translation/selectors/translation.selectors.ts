import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromTranslation from '../reducers/translation.reducer';

export const selectorTranslationState = createFeatureSelector<fromTranslation.State>(
  fromTranslation.translationFeatureKey
);

export const getStatus = createSelector(
  selectorTranslationState,
  (state) => state.status
);

export const getFormStatus = createSelector(
  selectorTranslationState,
  (state) => state.formStatus
);

export const getResult = createSelector(
  selectorTranslationState,
  (state) => state.result
);

export const getLanguages = createSelector(
  selectorTranslationState,
  (state) => state.languages
);

export const getError = createSelector(
  selectorTranslationState,
  (state) => state.error
);

