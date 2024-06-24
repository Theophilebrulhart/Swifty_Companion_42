import * as SecureStore from "expo-secure-store";
import { useCallback, useEffect, useReducer } from "react";

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
    await SecureStore.setItemAsync(key, value);
  }
}

export async function getStorageItemAsync(key: string): Promise<any> {
  try {
    const res = SecureStore.getItemAsync(key);
    return res;
  } catch (error) {
    throw new Error(`error in getStorageItemAsny : ${error}`);
  }
}

export function useStorageState(key: string): UseStateHooks<string> {
  const [state, setState] = useAsyncState<string>();
  useEffect(() => {
    SecureStore.getItemAsync(key).then((value) => {
      setState(value);
    });
  }, [key]);

  const setValue = useCallback(
    (value: string | null) => {
      setState(value);
      setStorageItemAsync(key, value);
    },
    [key]
  );

  return [state, setValue];
}
