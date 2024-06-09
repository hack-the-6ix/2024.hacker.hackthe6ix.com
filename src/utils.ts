import {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useCallback,
} from 'react';
import * as R from 'ramda';

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
