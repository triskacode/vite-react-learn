import {
  JSX,
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from 'react';

export type Theme = 'light' | 'dark' | 'system';
export interface ThemeProviderProps extends PropsWithChildren {
  defaultTheme?: Theme;
  storageKey?: string;
}

export interface ThemeProviderState {
  themes: Theme[];
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const initialState: ThemeProviderState = {
  themes: ['light', 'dark', 'system'],
  theme: 'system',
  setTheme: () => {},
};

export const ThemeProviderContext =
  createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  defaultTheme = 'system',
  storageKey = 'vite-ui-theme',
  children,
  ...props
}: ThemeProviderProps): JSX.Element {
  const themes = initialState.themes;

  function getTheme() {
    const theme = localStorage.getItem(storageKey) as Theme;

    if (themes.includes(theme)) return theme;
    else return defaultTheme;
  }

  const [theme, setThemeState] = useState<Theme>(getTheme);

  function setTheme(theme: Theme) {
    if (!themes.includes(theme)) return;

    localStorage.setItem(storageKey, theme);
    setThemeState(theme);
  }

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value: ThemeProviderState = {
    themes,
    theme,
    setTheme,
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}
