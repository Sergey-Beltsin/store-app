import { FC } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

export const Logo: FC = () => (
  <Link href="/" passHref>
    <Ref>store</Ref>
  </Link>
);

const Ref = styled.a`
  color: ${({ theme }) => theme.text};
  text-decoration: none;

  cursor: pointer;

  transition: 0.2s ease;
`;
