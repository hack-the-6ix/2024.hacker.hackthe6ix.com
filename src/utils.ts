import {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useCallback,
} from 'react';
import * as R from 'ramda';

export function useSessionStorage() {
  return {
    setItem: useCallback((key: string, value?: string) => {
      if (value) {
        window.sessionStorage.setItem(key, value);
      } else {
        window.sessionStorage.removeItem(key);
      }
      window.dispatchEvent(new Event(`sessionStorage:update:${key}`));
      window.dispatchEvent(new Event('sessionStorage:update'));
      window.dispatchEvent(new Event('sessionStorage'));
    }, []),
    clear: useCallback(() => {
      window.sessionStorage.clear();
      window.dispatchEvent(new Event('sessionStorage:clear'));
      window.dispatchEvent(new Event('sessionStorage'));
    }, []),
  };
}

export function useDebounceState<T>(
  initState: (() => T) | T,
  timeout: number,
): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(initState);
  const [proxy, setProxy] = useState<T>(state);

  useEffect(() => {
    const timer = window.setTimeout(() => setState(proxy), timeout);
    return () => window.clearTimeout(timer);
  }, [proxy, timeout]);

  return [state, setProxy];
}

export function useForceUpdate() {
  const [, setState] = useState(false);
  return useCallback(() => setState(R.not), []);
}
