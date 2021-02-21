import { FC } from 'react';
import styled from 'styled-components';

import { Logo, PageContainer } from '@/UI/atoms';

import {
  handleNavigationSearch,
  useNavigationStore,
} from '@/features/navigation/store';
import { Input } from '@/UI/atoms/forms';
import { SiteNavLinks, UserNavLinks } from '@/UI/molecules';
import useTranslation from 'next-translate/useTranslation';
import { SearchIcon } from '@/lib/icons';
import { SIZES } from '@/lib/constants/common';

type WrapperProps = {
  flex?: boolean;
  rightMargin?: number;
  center?: boolean;
};

export const Navigation: FC = () => {
  const { search } = useNavigationStore();
  const { t } = useTranslation('nav');

  return (
    <Container>
      <PageContainer>
        <MainWrapper>
          <LogoWrapper>
            <Wrapper center rightMargin={20}>
              <Logo />
            </Wrapper>
            <SiteNavLinks />
          </LogoWrapper>
          <InputWrapper>
            <Input
              value={search}
              onChange={(value: string) => handleNavigationSearch(value)}
              maxWidth="800px"
              placeholder={t('search')}
              icon={<SearchIcon />}
            />
          </InputWrapper>
          <UserNavLinksWrapper>
            <UserNavLinks />
          </UserNavLinksWrapper>
        </MainWrapper>
      </PageContainer>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 999;

  display: flex;
  align-items: flex-start;

  height: 122px;

  background-color: ${({ theme }) => theme.background};
  box-shadow: 0 1px 24px 0 rgba(0, 0, 0, 0.14);

  transition: 0.2s ease;

  @media (min-width: ${SIZES.TABLET}px) {
    align-items: center;

    height: 88px;
  }
`;

const MainWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  width: 100%;
  padding: 20px 0;

  @media (min-width: ${SIZES.TABLET}px) {
    flex-wrap: nowrap;

    padding: 0;
  }
`;

const Wrapper = styled.div<WrapperProps>`
  ${({ rightMargin }) => rightMargin && `margin-right: ${rightMargin}px;`}
  ${({ center }) =>
    center &&
    `
    display: flex;
    align-items: center;
    justify-content: space-between;
  `}
`;

const LogoWrapper = styled.div`
  display: flex;
  order: 1;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: center;
  order: 3;

  width: 100%;
  margin-top: 20px;

  @media (min-width: ${SIZES.TABLET}px) {
    order: 2;

    margin: 0 20px;
  }
`;

const UserNavLinksWrapper = styled.div`
  order: 2;

  @media (min-width: ${SIZES.TABLET}px) {
    order: 3;

    margin: 0 20px;
  }
`;
