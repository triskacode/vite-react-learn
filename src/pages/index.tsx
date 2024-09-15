import 'unfonts.css';
import '@/styles/index.css';
import { BaseLayout } from '@/components/layouts/base';
import ButtonComponentPage from '@/pages/components/button';
import { HomeLayout } from '@/components/layouts/home';
import HomePage from '@/pages/home';
import { JSX } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

export function Page(): JSX.Element {
  return (
    <BaseLayout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeLayout />}>
            <Route index element={<HomePage />} />
            <Route path="components">
              <Route path="button" element={<ButtonComponentPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </BaseLayout>
  );
}

export default Page;
