/* eslint-disable react/jsx-props-no-spreading */
import styled, { ThemeProvider } from 'styled-components';
import { AppProps } from 'next/app';
import Cookies from 'js-cookie';

import 'focus-visible';

import 'normalize.css';
import '../src/UI/_settings/styles.css';

import { initSentry } from '@/lib/utils';
import { theme as themeInstance } from '@/lib/constants/theme';
import { Navigation } from '@/features/navigation/containers';
import { handleTheme, useAppStore } from '@/features/app/store';
import { useEffect } from 'react';
import { SIZES } from '@/lib/constants/common';

initSentry();

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { theme } = useAppStore();

  useEffect(() => {
    if (Cookies.get('theme')) {
      handleTheme(Cookies.get('theme'));
    } else Cookies.set('theme', 'dark');
  }, []);

  return (
    <ThemeProvider theme={themeInstance[theme]}>
      <Navigation />
      <Main>
        <Component {...pageProps} />
      </Main>
    </ThemeProvider>
  );
};

export default MyApp;

const Main = styled.main`
  padding-top: 122px;

  background-color: ${({ theme }) => theme.background};
  transition: 0.2s ease;

  @media (min-width: ${SIZES.TABLET}px) {
    padding-top: 88px;
  }
`;
