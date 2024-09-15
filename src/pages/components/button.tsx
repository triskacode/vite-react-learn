import { Button } from '@/components/ui/button';

export default function Page(): JSX.Element {
  return (
    <div className="prose relative max-w-full py-6 dark:prose-invert lg:pl-6">
      <h1 className="mb-0">Button.</h1>
      <p className="mt-2">This is button component page.</p>
      <Button>Button</Button>
    </div>
  );
}
