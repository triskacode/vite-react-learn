import '@/styles/index.css';
import { Home } from '@/pages/home';
import { JSX } from 'react';
import { LayoutBase } from '@/components/layouts/base';

export function Page(): JSX.Element {
  return (
    <LayoutBase>
      <Home />
    </LayoutBase>
  );
}

export default Page;
