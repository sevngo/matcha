import { split, keys, includes } from 'ramda';
import messagesEn from '../translations/en.json';
import messagesFr from '../translations/fr.json';

const translations = {
  fr: messagesFr,
  en: messagesEn,
};

const language = split('-')(navigator.language)[0];

export const locale = (includes(language)(keys(translations)) && language) || 'en';

export const messages = translations[language] || messagesEn;
