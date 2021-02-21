import { FC } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import useTranslation from 'next-translate/useTranslation';

import { SIZES } from '@/lib/constants/common';
import { FocusVisible } from '@/UI/atoms';
import { generateUuid } from '@/lib/utils';

type RefProps = {
  notOpacity?: boolean;
};

interface ILink {
  title: string;
  href: string;
}

const LINKS: ILink[] = [
  {
    title: 'main',
    href: '/',
  },
  {
    title: 'categories',
    href: '/categories',
  },
  {
    title: 'sales',
    href: '/sale',
  },
];

export const SiteNavLinks: FC = () => {
  const { t } = useTranslation('nav');
  const { pathname } = useRouter();

  return (
    <Container>
      {LINKS.map((link) => (
        <Item key={generateUuid()}>
          <FocusVisible>
            <Link href={link.href} passHref>
              <Ref notOpacity={pathname === link.href}>{t(link.title)}</Ref>
            </Link>
          </FocusVisible>
        </Item>
      ))}
    </Container>
  );
};

const Container = styled.ul`
  display: none;
  align-items: center;

  padding: 0;
  margin: 0;

  list-style: none;

  @media (min-width: ${SIZES.TABLET}px) {
    display: flex;
  }
`;

const Item = styled.li`
  &:not(:first-child) {
    margin-left: 20px;
  }
`;

const Ref = styled.a<RefProps>`
  display: block;

  color: ${({ theme }) => theme.text};
  text-decoration: none;

  cursor: pointer;
  opacity: ${({ notOpacity }) => (notOpacity ? 1 : 0.6)};

  transition: 0.2s ease;

  &:hover,
  &:focus {
    opacity: 0.7;
  }

  &:active {
    opacity: 1;
    transform: scale(0.95);
  }
`;
