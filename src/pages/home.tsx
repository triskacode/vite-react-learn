import { Button } from '@/components/ui/button';
import { JSX } from 'react';
import { ThemeSwitch } from '@/components/theme-switch';

export function Home(): JSX.Element {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-semibold">React + Vite + TailwindCss</h1>
      <Button variant="default">Click me</Button>
      <ThemeSwitch />
    </main>
  );
}
