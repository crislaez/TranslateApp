import { EntityStatus } from '@traductorApp/shared/utils/helpers/functions';
import { createReducer, on } from '@ngrx/store';
import * as TranslationActions from '../actions/translation.actions';
import { Result, Languages } from '../models';

export const translationFeatureKey = 'translation';

export interface State {
  status?: EntityStatus;
  formStatus?: EntityStatus;
  result?: Result;
  languages?: Languages[];
  error?: unknown;
}

export const initialState: State = {
  status: EntityStatus.Initial,
  formStatus: EntityStatus.Initial,
  result: null,
  languages: null,
  error: undefined
};

export const reducer = createReducer(
  initialState,
  on(TranslationActions.loadTranslation, (state): State => ({ ...state, error: undefined, formStatus: EntityStatus.Pending })),
  on(TranslationActions.saveTranslation, (state, { result, status, error }): State => ({ ...state, result, formStatus: status, error })),

  on(TranslationActions.loadSupportLanguages, (state): State => ({ ...state, error: undefined, status: EntityStatus.Pending })),
  on(TranslationActions.saveSupportLanguages, (state, { languages, status, error }): State => ({ ...state, languages, status, error })),

  on(TranslationActions.deleteTranslation, (state): State => ({ ...state, error: undefined, result:null, status: EntityStatus.Initial, formStatus: EntityStatus.Initial })),
);
