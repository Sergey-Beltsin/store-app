import { FC, ReactNode } from 'react';
import Link from 'next/link';
import styled from 'styled-components';

import {
  CartIcon,
  HeartIcon,
  MoonIcon,
  NotificationIcon,
  SunIcon,
  UserIcon,
} from '@/lib/icons';
import { handleTheme, useAppStore } from '@/features/app/store';
import { FocusVisible } from '@/UI/atoms';
import { generateUuid } from '@/lib/utils';

interface ILink {
  href: string;
  icon: ReactNode;
  onClick?: () => void;
}

export const UserNavLinks: FC = () => {
  const { theme, user } = useAppStore();

  const LINKS: ILink[] = [
    {
      href: '/profile/wishlist',
      icon: <HeartIcon />,
    },
    {
      href: '/order',
      icon: <CartIcon />,
    },
    {
      href: '',
      icon: <NotificationIcon />,
      onClick: () => console.log('notification clicked'),
    },
    {
      href: '',
      icon: theme === 'white' ? <MoonIcon /> : <SunIcon />,
      onClick: () => handleTheme(theme === 'white' ? 'dark' : 'white'),
    },
    {
      href: user ? '/profile' : '/id/register',
      icon: <UserIcon />,
    },
  ];

  return (
    <Container>
      {LINKS.map((link) => (
        <Item key={generateUuid()}>
          <FocusVisible>
            <Link href={link.href} passHref>
              <Ref onClick={link.onClick}>
                <Icon>{link.icon}</Icon>
              </Ref>
            </Link>
          </FocusVisible>
        </Item>
      ))}
    </Container>
  );
};

const Container = styled.ul`
  display: flex;

  padding: 0;
  margin: 0;

  list-style: none;
`;

const Item = styled.li`
  &:not(:first-child) {
    margin-left: 20px;
  }
`;

const Ref = styled.a`
  display: flex;

  cursor: pointer;

  opacity: 0.5;

  transition: 0.2s ease;

  &:hover,
  &:focus {
    opacity: 0.7;
  }

  &:active {
    opacity: 1;
    transform: scale(0.95);
  }

  & svg {
    width: 25px;
    height: 25px;

    & path {
      fill: ${({ theme }) => theme.icon};

      transition: 0.2s ease;
    }
  }
`;

const Icon = styled.div``;
