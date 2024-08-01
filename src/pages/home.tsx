import { Button } from '@/components/ui/button';
import { JSX } from 'react';

export function Home(): JSX.Element {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-semibold text-slate-950">
        React + Vite + TailwindCss
      </h1>
      <Button variant="default">Click me</Button>
    </div>
  );
}
