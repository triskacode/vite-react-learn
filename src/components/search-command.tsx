import { Button } from './ui/button';
import { NavigationItem } from '@/lib/definition';
import { cn } from '@/lib/utils';
import { navigationDict } from '@/lib/navigation';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@/hooks/use-theme';
import {
  ArrowLeft,
  ArrowRight,
  Monitor,
  Moon,
  Search,
  Sun,
} from 'lucide-react';
import {
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
  Command as DefaultCommand,
  CommandItem as DefaultCommandItem,
} from './ui/command';
import {
  ComponentProps,
  Fragment,
  JSX,
  PropsWithChildren,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { Dialog, DialogTitle, PlainDialogContent } from './ui/dialog';
import { Drawer, DrawerContent } from './ui/drawer';

export function SearchCommand(): JSX.Element {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [pages, setPages] = useState<string[]>([]);
  const page = pages[pages.length - 1];

  const command = (fn: () => void) => () => {
    setOpen(false);
    fn();
  };

  const moveToPreviousPageKeyboard = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' || (e.key === 'Backspace' && !search)) {
      e.preventDefault();
      setSearch('');
      setPages((pages) => pages.slice(0, -1));
    }
  };

  const moveToPreviousPage = () => {
    setPages((pages) => pages.slice(0, -1));
    setSearch('');
  };

  const moveToNextPage = (value: string) => () => {
    setPages((pages) => [...pages, value]);
    setSearch('');
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  return (
    <Fragment>
      <SearchTrigger onClick={() => setOpen(true)} />
      <DrawerDialogSearch open={open} onOpenChange={setOpen}>
        <DialogTitle className="sr-only">Global Command Menu</DialogTitle>
        <Command
          onKeyDown={moveToPreviousPageKeyboard}
          onValueChange={() => setSearch('')}
        >
          <CommandInput
            value={search}
            onValueChange={setSearch}
            placeholder="Type a command or search..."
          />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            {!page && (
              <Fragment>
                <CommandGroup heading="Navigation">
                  <NavigationListCommand command={command} />
                </CommandGroup>
                <CommandGroup heading="General">
                  <CommandItem noIcon onSelect={moveToNextPage('change-theme')}>
                    <Monitor className="size-4" />
                    Change Theme...
                  </CommandItem>
                </CommandGroup>
              </Fragment>
            )}
            {page === 'change-theme' && (
              <CommandGroup>
                <CommandItem noIcon onSelect={moveToPreviousPage}>
                  <ArrowLeft className="size-4" />
                  Back
                </CommandItem>
                <ChangeThemeListCommand command={command} />
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </DrawerDialogSearch>
    </Fragment>
  );
}

type SearchTriggerProps = ComponentProps<typeof Button>;

function SearchTrigger(props: SearchTriggerProps): JSX.Element {
  return (
    <Button
      variant="outline"
      className="w-9 items-center justify-center gap-1 p-0 font-normal text-muted-foreground hover:bg-background hover:text-muted-foreground md:w-auto md:min-w-80 md:justify-between md:pl-3 md:pr-1.5"
      {...props}
    >
      <div className="flex items-center gap-1 overflow-x-hidden">
        <Search className="h-4" />
        <span className="sr-only truncate md:not-sr-only">
          Type a command or search...
        </span>
      </div>
      <kbd className="pointer-events-none hidden h-5 select-none items-center rounded border border-input bg-muted px-1 font-sans text-[10px] font-medium md:flex md:gap-1">
        <span className="text-xs">⌘</span>
        <span>K</span>
      </kbd>
    </Button>
  );
}

interface DrawerDialogSearchProps extends PropsWithChildren {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function DrawerDialogSearch({
  open,
  onOpenChange,
  children,
}: DrawerDialogSearchProps): JSX.Element {
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <PlainDialogContent
          className="overflow-hidden p-0"
          aria-describedby={undefined}
        >
          {children}
        </PlainDialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}
      setBackgroundColorOnScale={false}
    >
      <DrawerContent aria-describedby={undefined}>{children}</DrawerContent>
    </Drawer>
  );
}

type CommandProps = ComponentProps<typeof DefaultCommand>;

function Command({ className, ...props }: CommandProps): JSX.Element {
  return (
    <DefaultCommand
      className={cn(
        '[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-group]]:px-2 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5',
        className,
      )}
      {...props}
    />
  );
}

interface CommandItemProps extends ComponentProps<typeof DefaultCommandItem> {
  icon?: ReactNode;
  noIcon?: boolean;
}

function CommandItem({
  icon,
  noIcon,
  children,
  ...props
}: CommandItemProps): JSX.Element {
  return (
    <DefaultCommandItem
      className="flex cursor-pointer items-center gap-2"
      {...props}
    >
      {!noIcon ? icon ? icon : <ArrowRight className="size-4" /> : null}
      {children}
    </DefaultCommandItem>
  );
}

interface NavigationListCommandProps {
  command: (fn: () => void) => () => void;
}

function NavigationListCommand({
  command,
}: NavigationListCommandProps): JSX.Element {
  const navigate = useNavigate();

  function generateNavigationCommand(navigation: NavigationItem): ReactNode {
    if (navigation.type === 'group') {
      return (
        navigation.items &&
        navigation.items.length > 0 &&
        navigation.items.map(generateNavigationCommand)
      );
    }

    if (navigation.disabled) {
      return null;
    }

    return (
      <CommandItem
        key={navigation.href}
        onSelect={command(() =>
          navigation.external
            ? window.open(navigation.href, '_blank', 'noreferrer')
            : navigate(navigation.href ?? '#'),
        )}
      >
        Go to {navigation.displayName}
      </CommandItem>
    );
  }

  return (
    <Fragment>
      {Object.keys(navigationDict).map((key) =>
        generateNavigationCommand(navigationDict[key]),
      )}
    </Fragment>
  );
}

interface ChangeThemeListCommandProps {
  command: (fn: () => void) => () => void;
}

function ChangeThemeListCommand({
  command,
}: ChangeThemeListCommandProps): JSX.Element {
  const { setTheme } = useTheme();

  return (
    <Fragment>
      <CommandItem noIcon onSelect={command(() => setTheme('dark'))}>
        <Moon className="size-4" />
        Change Theme to Dark
      </CommandItem>
      <CommandItem noIcon onSelect={command(() => setTheme('light'))}>
        <Sun className="size-4" />
        Change Theme to Light
      </CommandItem>
      <CommandItem noIcon onSelect={command(() => setTheme('system'))}>
        <Monitor className="size-4" />
        Change Theme to System
      </CommandItem>
    </Fragment>
  );
}
