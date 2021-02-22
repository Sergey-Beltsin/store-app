import { FC } from 'react';
import styled from 'styled-components';

type Props = {
  title: string;
};

export const IdContainer: FC<Props> = ({ children, title }) => (
  <Container>
    <Title>{title}</Title>
    {children}
  </Container>
);

const Container = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 20px;
  margin: 0 auto;

  background-color: ${({ theme }) => theme.backggroundSecondary};
`;

const Title = styled.h1`
  margin: 0;
  margin-bottom: 30px;

  font-size: 28px;
  color: ${({ theme }) => theme.text};

  transition: 0.2s ease;
`;
