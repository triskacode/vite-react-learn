import { Button } from '../ui/button';
import { GithubIcon } from '../icons/github';
import { Palette } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ComponentProps, ElementRef, JSX, forwardRef } from 'react';
import { SearchCommand } from '../search-command';

export type HomeLayoutProps = ComponentProps<'div'>;

const HomeLayout = forwardRef<ElementRef<'div'>, HomeLayoutProps>(
  ({ children, className, ...props }, ref): JSX.Element => {
    return (
      <div
        className={cn('flex min-h-dvh w-full flex-col', className)}
        ref={ref}
        {...props}
      >
        <LayoutHeader />
        <div className="container grid flex-grow grid-cols-1 content-stretch lg:grid-cols-[var(--layout-sidebar-width)_1fr]">
          <main className="lg:order-2">{children}</main>
          <aside className="hidden border-r lg:block">sa</aside>
        </div>
      </div>
    );
  },
);

function LayoutHeader(): JSX.Element {
  return (
    <header className="sticky top-0 z-10 h-layout-header">
      <div className="container flex h-full w-full">
        <div className="flex flex-grow items-center justify-start gap-2 lg:w-layout-sidebar lg:grow-0 lg:border-r">
          <Palette className="mt-1 size-5 shrink-0" />
          <p className="flex-grow text-lg font-semibold">playground</p>
        </div>
        <div className="flex grow-0 items-center justify-between pl-4 md:pl-6 lg:flex-grow">
          <div>
            <SearchCommand />
          </div>
          <div className="hidden items-center gap-2 lg:flex">
            <Button variant="ghost" size="icon">
              <GithubIcon className="size-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

export { HomeLayout };
