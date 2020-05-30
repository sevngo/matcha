import { split, keys, includes } from 'ramda';
import frMessages from './fr.json';

const translations = {
  fr: frMessages,
};

const language = split('-')(navigator.language)[0];

export const locale =
  (includes(language)(keys(translations)) && language) || 'en';

export const messages = translations[language];
