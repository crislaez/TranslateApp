import { EntityStatus } from '@traductorApp/shared/utils/helpers/functions';
import { createAction, props } from '@ngrx/store';
import { GoogleObj, Languages } from '../models';


export const loadTranslation = createAction(
  '[Translation] Load Translation',
  props<{ obj: GoogleObj }>()
);

export const saveTranslation = createAction(
  '[Translation] Save Translation',
  props<{ result: any, error:unknown, status:EntityStatus }>()
);


export const loadSupportLanguages = createAction(
  '[Languaje] Load Support Languages'
);

export const saveSupportLanguages  = createAction(
  '[Languaje] Save Support Languages',
  props<{ languages: Languages[], error:unknown, status:EntityStatus }>()
);


export const deleteTranslation = createAction(
  '[Translation] Delete Translation'
);
