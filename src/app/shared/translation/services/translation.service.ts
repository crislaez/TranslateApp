import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CoreConfigService } from '@traductorApp/core/services/core-config.service';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GoogleObj, Languages, Response, ResponseApi, ResponsLanguajeApi, Translations } from '../models';


@Injectable({
  providedIn: 'root'
})
export class TranslationService {


  baseURL: string = `${this._coreConfig.getEndpoint()}?key=${this._coreConfig.getApiKey()}`;
  baseLanguajeURL: string = `${this._coreConfig.getEndpoint()}/languages?key=${this._coreConfig.getApiKey()}`;
  isoLang:{[key:string]:{name:string, nativeName:string}} = this._coreConfig.getIsoLangs();


  constructor(private http: HttpClient, private _coreConfig: CoreConfigService) { }


  getTranslation(obj: GoogleObj): Observable<Response> {
    return this.http.post<any>(`${this.baseURL}`, obj).pipe(
      map((res): any => {
        const { data = null } = (res as ResponseApi) || {}
        const { translations = null } = (data as Translations) || {};
        const { translatedText = null } = (translations as Response)?.[0]
        return { translatedText }
      }),
      catchError((error) => {
        return throwError(error)
      })
    )
  }

  getSupportLanguajes(): Observable<Languages[]> {
    return this.http.get<any>(`${this.baseLanguajeURL}`).pipe(
      map((item: ResponsLanguajeApi) => {
        const { data = null } = item || {};
        const { languages = null } = data || {};
        return (languages || [])?.map(({language}, index) => ({id:index, language, label: this.isoLang?.[language]?.nativeName || language })) || []
      }),
      catchError((error) => {
        return throwError(error)
      })
    )
  }



}

