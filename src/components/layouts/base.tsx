import { ThemeProvider } from '../theme-provider';
import { Fragment, JSX, PropsWithChildren } from 'react';

export type LayoutBaseProps = PropsWithChildren;

export function LayoutBase({ children }: LayoutBaseProps): JSX.Element {
  return (
    <Fragment>
      <ThemeProvider defaultTheme="system" storageKey="ui-theme">
        {children}
      </ThemeProvider>
    </Fragment>
  );
}
