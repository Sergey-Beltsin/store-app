import { FC, ReactElement } from 'react';
import { ThemeProvider } from 'styled-components';

import { theme as themeInstance } from '@/lib/constants/theme';
import { render, RenderOptions } from '@testing-library/react';

const Providers: FC = ({ children }) => (
  <ThemeProvider theme={themeInstance.white}>{children}</ThemeProvider>
);

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'>,
) => render(ui, { wrapper: Providers, ...options });

export * from '@testing-library/react';

export { customRender as render };
