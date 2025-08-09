import storageKeys from '@/constants/storageKeys';
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import storage from 'utils/storage';
import en from './en.json';
import vi from './vi.json';

export const translationResources = {
  vi: {
    translation: vi,
  },
  en: {
    translation: en,
  },
};

i18next
  .use({
    async: true,
    type: 'languageDetector',
    init: () => {},
    cacheUserLanguage: async (lng: string) => {
      await storage.setItem(storageKeys.LANGUAGE, lng);
    },
    detect: async () => {
      try {
        const language = await storage.getItem(storageKeys.LANGUAGE);
        return language ?? 'vi';
      } catch {
        return 'vi';
      }
    },
  })
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v4',
    fallbackLng: 'vi',
    resources: translationResources,
    saveMissing: true, // Must be set to true
    parseMissingKeyHandler: (key: string) => {
      if (!key) return null;
      return key;
    },
    react: {
      useSuspense: false,
    },
  });
const translation = i18next;
export default translation;
