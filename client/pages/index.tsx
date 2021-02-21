import { FC } from 'react';
import styled from 'styled-components';

import { PageContainer } from '@/UI/atoms';
import { StoreCards } from '@/UI/molecules';
import { PRODUCTS } from '@/lib/mock/data';

const Home: FC = () => (
  <Container>
    <PageContainer>
      <Title>Main</Title>
      <StoreCards data={PRODUCTS} />
    </PageContainer>
  </Container>
);

export default Home;

const Container = styled.div``;

const Title = styled.h1``;
