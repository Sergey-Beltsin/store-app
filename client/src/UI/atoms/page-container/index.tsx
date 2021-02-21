import { FC } from 'react';
import styled from 'styled-components';

import { SIZES } from '@/lib/constants/common';

export const PageContainer: FC = ({ children }) => (
  <Container>{children}</Container>
);

const Container = styled.div`
  width: 95%;
  max-width: ${SIZES.MAX_WIDTH}px;
  margin: 0 auto;
`;
