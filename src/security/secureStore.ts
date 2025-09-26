import { Platform } from 'react-native';

type NullableString = string | null;

const isWeb = Platform.OS === 'web';

// Keys namespace to avoid collisions on web localStorage
const KEY_PREFIX = 'iprn_';

async function getItemAsync(key: string): Promise<NullableString> {
  if (!isWeb) {
    const SecureStore = await import('expo-secure-store');
    // @ts-expect-error dynamic import type
    return SecureStore.getItemAsync(key);
  }
  try {
    const value = window.localStorage.getItem(KEY_PREFIX + key);
    return value;
  } catch {
    return null;
  }
}

async function setItemAsync(key: string, value: string): Promise<void> {
  if (!isWeb) {
    const SecureStore = await import('expo-secure-store');
    // @ts-expect-error dynamic import type
    return SecureStore.setItemAsync(key, value);
  }
  try {
    window.localStorage.setItem(KEY_PREFIX + key, value);
  } catch {
    // ignore write errors on web
  }
}

async function deleteItemAsync(key: string): Promise<void> {
  if (!isWeb) {
    const SecureStore = await import('expo-secure-store');
    // @ts-expect-error dynamic import type
    return SecureStore.deleteItemAsync(key);
  }
  try {
    window.localStorage.removeItem(KEY_PREFIX + key);
  } catch {
    // ignore
  }
}

export const SecureStoreCompat = {
  getItemAsync,
  setItemAsync,
  deleteItemAsync,
};

export default SecureStoreCompat;




