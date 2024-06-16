import * as SecureStore from "expo-secure-store";
import { useCallback, useEffect, useReducer } from "react";
import { Platform } from "react-native";

type UseStateHooks<T> = [[boolean, T | null], (value: T | null) => void];

function useAsyncState<T>(
  initialValue: [boolean, T | null] = [true, null]
): UseStateHooks<T> {
  return useReducer(
    (
      state: [boolean, T | null],
      action: T | null = null
    ): [boolean, T | null] => [false, action],
    initialValue
  ) as UseStateHooks<T>;
}

export async function setStorageItemAsync(key: string, value: string | null) {
  if (value === null) await SecureStore.deleteItemAsync(key);
  else {
    // console.log(`in set storage Setting ${key} in SecureStore to:`, value),
    await SecureStore.setItemAsync(key, value);
  }
}

export function useStorageState(key: string): UseStateHooks<string> {
  const [state, setState] = useAsyncState<string>();
  useEffect(() => {
    SecureStore.getItemAsync(key).then((value) => {
      setState(value);
      // console.log(`Retrieved ${key} from SecureStore:`, value);
    });
  }, [key]);

  const setValue = useCallback(
    (value: string | null) => {
      // console.log(`Setting ${key} in SecureStore to:`, value);
      setState(value);
      setStorageItemAsync(key, value);
    },
    [key]
  );

  return [state, setValue];
}
