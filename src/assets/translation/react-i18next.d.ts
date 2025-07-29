import { translationResources } from 'translation';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: (typeof translationResources)['en'];
    returnNull: false;
  }
}
