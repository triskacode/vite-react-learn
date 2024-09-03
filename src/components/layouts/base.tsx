import { ThemeProvider } from '../theme-provider';
import { Fragment, JSX, PropsWithChildren } from 'react';

export type BaseLayoutProps = PropsWithChildren;

export function BaseLayout({ children }: BaseLayoutProps): JSX.Element {
  return (
    <Fragment>
      <ThemeProvider defaultTheme="system" storageKey="ui-theme">
        {children}
      </ThemeProvider>
    </Fragment>
  );
}
