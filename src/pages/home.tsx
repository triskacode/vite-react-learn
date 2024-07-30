import { JSX } from 'react';

export function Home(): JSX.Element {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <h1 className="text-4xl font-semibold text-slate-500">Hello world</h1>
    </div>
  );
}
