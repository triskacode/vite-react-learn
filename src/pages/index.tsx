import 'unfonts.css';
import '@/styles/index.css';
import { BaseLayout } from '@/components/layouts/base';
import { Home } from '@/pages/home';
import { HomeLayout } from '@/components/layouts/home';
import { JSX } from 'react';

export function Page(): JSX.Element {
  return (
    <BaseLayout>
      <HomeLayout>
        <Home />
      </HomeLayout>
    </BaseLayout>
  );
}

export default Page;
