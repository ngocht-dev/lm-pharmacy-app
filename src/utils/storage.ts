import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

const setItem = async (key: string, value: any) => {
  let storeValue = value;
  if (typeof value === 'boolean' || typeof value === 'number') {
    storeValue = String(value);
  }
  if (typeof value === 'object') {
    storeValue = JSON.stringify(value);
  }
  try {
    await AsyncStorage.setItem(key, storeValue);
  } catch {}
};

const getItem = async (key: string) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch {}
};

async function setSecureItem(
  key: string,
  value: string,
  useBiometric?: boolean
) {
  await SecureStore.setItemAsync(key, value, {
    requireAuthentication: useBiometric,
  });
}

async function getSecureItem(key: string) {
  return SecureStore.getItemAsync(key, {
    requireAuthentication: true,
  })
    .then((value) => value)
    .catch(() => null);
}

async function removeSecureItem(key: string) {
  return SecureStore.deleteItemAsync(key)
    .then((value) => value)
    .catch(() => {});
}

export default {
  setItem,
  getItem,
  setSecureItem,
  getSecureItem,
  removeSecureItem,
};
