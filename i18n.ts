// i18n.ts
import i18next from 'i18next';
import HttpBackend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

i18next
    .use(HttpBackend)
    .use(initReactI18next)
    .init({
        lng: 'vi', // Default language
        fallbackLng: 'vi', // Fallback language
        backend: {
            loadPath: '/locales/{{lng}}/{{ns}}.json', // Path to translation files
        },
        ns: ['common'], // Namespace for translation files
        defaultNS: 'common',
        interpolation: {
            escapeValue: false, // Disable escaping of special characters
        },
    });

export default i18next;
