import { useAuthStore } from './appStore';

// ATTENTION: Add all new stores here for the initialisation to work
const stores = [useAuthStore];

export const initializeStores = async () => {
  await Promise.all(
    stores.map(async (store) => {
      if (store.persist?.hasHydrated()) {
        return Promise.resolve();
      }
      return new Promise((resolve) => {
        store.persist?.onFinishHydration(() => resolve(undefined));
      });
    })
  );

  console.log('Stores initialized');
};
