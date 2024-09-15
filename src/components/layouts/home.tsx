import { Button } from '../ui/button';
import { GithubIcon } from '../icons/github';
import { NavigationItem } from '@/lib/definition';
import { Palette } from 'lucide-react';
import { SearchCommand } from '../search-command';
import { cn } from '@/lib/utils';
import { navigationDict } from '@/lib/navigation';
import { ComponentProps, ElementRef, JSX, ReactNode, forwardRef } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export type HomeLayoutProps = ComponentProps<'div'>;

const HomeLayout = forwardRef<ElementRef<'div'>, HomeLayoutProps>(
  ({ className, ...props }, ref): JSX.Element => {
    return (
      <div
        className={cn('flex min-h-dvh w-full flex-col', className)}
        ref={ref}
        {...props}
      >
        <LayoutHeader />
        <div className="container grid flex-grow grid-cols-1 content-stretch lg:grid-cols-[var(--layout-sidebar-width)_1fr]">
          <LayoutSidebar />
          <LayoutMain />
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
        <div className="flex grow-0 items-center justify-between pl-4 lg:flex-grow lg:pl-6">
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

function LayoutSidebar(): JSX.Element {
  function generateNavItem(navigation: NavigationItem): ReactNode {
    if (navigation.type === 'group') {
      return (
        <NavGroup heading={navigation.displayName}>
          {navigation.items &&
            navigation.items.length > 0 &&
            navigation.items.map((item) => generateNavItem(item))}
        </NavGroup>
      );
    }
    return (
      <NavItem
        to={navigation.href ?? ''}
        key={navigation.href}
        disabled={navigation.disabled}
        external={navigation.external}
      >
        {navigation.displayName}
      </NavItem>
    );
  }

  return (
    <aside className="-ml-3 hidden flex-col border-r py-6 pr-3 lg:flex">
      {Object.keys(navigationDict).map((key) =>
        generateNavItem(navigationDict[key]),
      )}
    </aside>
  );
}

function LayoutMain(): JSX.Element {
  return (
    <main className="flex flex-grow flex-col">
      <Outlet />
    </main>
  );
}

interface NavGroupProps extends ComponentProps<'div'> {
  heading: string;
}

function NavGroup({ heading, children, ...props }: NavGroupProps): JSX.Element {
  return (
    <div className="mb-4 flex flex-col" {...props}>
      <p className="flex h-8 items-center overflow-x-hidden px-3 text-sm font-semibold">
        <span className="truncate">{heading}</span>
      </p>
      {children}
    </div>
  );
}

interface NavItemProps extends ComponentProps<typeof NavLink> {
  className?: string;
  disabled?: boolean;
  external?: boolean;
}

function NavItem({
  children,
  className,
  disabled,
  external,
  ...props
}: NavItemProps): JSX.Element {
  if (disabled) {
    return (
      <NavItemButton className={className} disabled>
        <span className="truncate">{children as ReactNode}</span>
      </NavItemButton>
    );
  }

  if (external) {
    return (
      <NavItemButton asChild className={className}>
        <a href={(props.to as string) ?? ''} target="_blank" rel="noreferrer">
          <span className="truncate">{children as ReactNode}</span>
        </a>
      </NavItemButton>
    );
  }

  return (
    <NavItemButton
      asChild
      className={cn(
        '[&.active]:font-semibold [&.active]:text-foreground',
        className,
      )}
    >
      <NavLink {...props}>
        <span className="truncate">{children as ReactNode}</span>
      </NavLink>
    </NavItemButton>
  );
}

type NavItemButtonProps = ComponentProps<typeof Button>;

function NavItemButton({
  children,
  className,
  ...props
}: NavItemButtonProps): JSX.Element {
  return (
    <Button
      variant="link"
      size="sm"
      className={cn(
        'justify-start overflow-x-hidden font-normal text-muted-foreground underline-offset-2',
        className,
      )}
      {...props}
    >
      {children}
    </Button>
  );
}

export { HomeLayout };
