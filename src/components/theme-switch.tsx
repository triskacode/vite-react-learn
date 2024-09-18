import { Label } from './ui/label';
import { Theme } from './theme-provider';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/use-theme';
import { ComponentProps, JSX } from 'react';
import { Monitor, Moon, Sun } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';

interface ThemeOption {
  id: string;
  value: string;
  label: string;
}

const themeOptions: ThemeOption[] = [
  {
    id: 'switch-to-light-theme',
    value: 'light',
    label: 'switch to light theme',
  },
  {
    id: 'switch-to-system-theme',
    value: 'system',
    label: 'switch to system theme',
  },
  {
    id: 'switch-to-dark-theme',
    value: 'dark',
    label: 'switch to dark theme',
  },
] as const;

export function ThemeSwitch(): JSX.Element {
  const { theme, setTheme } = useTheme();

  return (
    <RadioGroup
      className="flex flex-row items-center justify-center gap-0 rounded-full border p-0.5 focus-within:ring-1 focus-within:ring-ring"
      aria-label="theme switcher"
      defaultValue={theme}
      value={theme}
      onValueChange={(value: Theme) => setTheme(value)}
    >
      {themeOptions.map((option) => (
        <div key={option.id}>
          <RadioGroupItem
            id={option.id}
            value={option.value}
            className="peer sr-only"
            aria-label={option.label}
          />
          <ThemeSwitchLabel htmlFor={option.id}>
            {option.value === 'light' ? (
              <Sun className="size-4" />
            ) : option.value === 'dark' ? (
              <Moon className="size-4" />
            ) : (
              <Monitor className="size-4" />
            )}
          </ThemeSwitchLabel>
        </div>
      ))}
    </RadioGroup>
  );
}

type ThemeSwitchLabelProps = ComponentProps<typeof Label>;

function ThemeSwitchLabel(props: ThemeSwitchLabelProps): React.JSX.Element {
  const { children, className, htmlFor, ...defaultProps } = props;
  return (
    <Label
      htmlFor={htmlFor}
      className={cn(
        'flex h-8 w-8 shrink-0 items-center justify-center rounded-full hover:bg-accent hover:text-accent-foreground peer-aria-checked:bg-primary peer-aria-checked:text-primary-foreground',
        className,
      )}
      {...defaultProps}
    >
      {children}
    </Label>
  );
}
