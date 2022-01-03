export interface GoogleObj{
  q: string;
  target: string;
  source: string;
}

export interface ResponseApi{
  data: Translations;
}

export interface Translations {
  translations?: Response[]
}

export interface Response {
  detectedSourceLanguage?: string;
  translatedText?: string;
}


export interface ResponsLanguajeApi {
  data: Languajes
}

export interface Languajes {
  languages?: Languages[]
}

export interface Languages {
  id?: number;
  language?: string;
  label?: string;
}


export interface Result {
  translatedText?: string;
  detectedSourceLanguage?: string;
  target?: string;
  textToTranslate?: string;
}
