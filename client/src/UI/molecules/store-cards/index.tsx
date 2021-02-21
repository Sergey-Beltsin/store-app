import { FC } from 'react';
import { Products } from '@/lib/mock/data';
import { StoreCard } from '@/UI/atoms';
import styled from 'styled-components';
import { SIZES } from '@/lib/constants/common';

type Props = {
  data: Products;
};

export const StoreCards: FC<Props> = ({ data }) => (
  <Container>
    {data.map((product) => (
      <StoreCard
        href={product.href}
        title={product.title}
        price={product.price}
      />
    ))}
  </Container>
);

const Container = styled.section`
  display: grid;
  grid-gap: 20px;

  @media (min-width: ${SIZES.MOBILE_MIDDLE}px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${SIZES.TABLET}px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: ${SIZES.PC}px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;
