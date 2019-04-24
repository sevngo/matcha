import { split, keys, includes } from 'ramda';
import enMessages from '../translations/en.json';
import frMessages from '../translations/fr.json';

const translations = {
  en: enMessages,
  fr: frMessages,
};

const language = split('-')(navigator.language)[0];

export const locale = (includes(language)(keys(translations)) && language) || 'en';

export const messages = translations[language] || enMessages;
