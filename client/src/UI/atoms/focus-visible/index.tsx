import { FC } from 'react';
import styled from 'styled-components';

type Props = {
  maxWidth?: string;
};

export const FocusVisible: FC<Props> = ({ maxWidth, children }) => (
  <Container className="js-focus-visible focus-visible" maxWidth={maxWidth}>
    {children}
  </Container>
);

const Container = styled.div<Props>`
  width: 100%;
  max-width: ${({ maxWidth }) => maxWidth || 'fit-content'};

  &.js-focus-visible > * {
    outline: 2px solid transparent;
    outline-offset: -2px;
    -moz-outline-radius: 6px;
  }

  &.js-focus-visible .focus-visible {
    outline-color: ${({ theme }) => theme.common.outline};
    outline-offset: 0;
  }
`;
