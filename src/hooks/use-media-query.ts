import { useSyncExternalStore } from 'react';

/** @see {@link https://github.com/uidotdev/usehooks/blob/main/index.js React UseHook} */
export function useMediaQuery(query: string) {
  const subscribe = (callback: () => void) => {
    const matchMedia = window.matchMedia(query);

    matchMedia.addEventListener('change', callback);
    return () => {
      matchMedia.removeEventListener('change', callback);
    };
  };

  const getSnapshot = () => {
    return window.matchMedia(query).matches;
  };

  const getServerSnapshot = () => {
    throw Error('useMediaQuery is a client-only hook');
  };

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
