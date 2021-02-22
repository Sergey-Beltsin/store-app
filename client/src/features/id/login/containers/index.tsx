/* eslint-disable no-shadow */
import { FC } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import useTranslation from 'next-translate/useTranslation';

import { Button, IdContainer } from '@/UI/atoms';
import { Input } from '@/UI/atoms/forms';
import {
  handleLoginEmail,
  handleLoginErrors,
  handleLoginPassword,
  useLoginStore,
} from '@/features/id/login/store';
import { SIZES } from '@/lib/constants/common';

const emailValidation = (email: string): boolean => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const passwordValidation = (password: string): boolean => {
  const re = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&? "]).*$/;
  return re.test(password);
};

export const LoginContainer: FC = () => {
  const { t } = useTranslation('id');
  const { email, password, errors } = useLoginStore();

  const handleError = (field: string, value: string) =>
    handleLoginErrors({ ...errors, [field]: value });

  const handleEmailBlur = (email: string): void => {
    if (!email) {
      handleError('email', 'length');
      return;
    }

    if (!emailValidation(email)) {
      handleError('email', 'validation');
      return;
    }

    handleError('email', '');
  };

  const handlePasswordBlur = (password: string): void => {
    if (!password) {
      handleError('password', 'length');
      return;
    }

    if (password.length < 3) {
      handleError('password', 'tooShort');
      return;
    }

    if (password.length > 16) {
      handleError('password', 'tooLong');
      return;
    }

    if (!passwordValidation(password)) {
      handleError('password', 'validation');
      return;
    }

    handleError('password', '');
  };

  const isDisabled = (): boolean =>
    !!(
      !email ||
      !emailValidation(email) ||
      errors.email ||
      !password ||
      !passwordValidation(password) ||
      errors.password
    );

  return (
    <Container>
      <IdContainer title={t('login')}>
        <Form>
          <Wrapper>
            <Input
              value={email}
              onChange={(value) => handleLoginEmail(value)}
              placeholder={t('email')}
              onBlur={handleEmailBlur}
              maxWidth="100%"
              error={errors.email}
            />
          </Wrapper>
          <Wrapper>
            <Input
              value={password}
              onChange={(value) => handleLoginPassword(value)}
              type="password"
              placeholder={t('password')}
              onBlur={handlePasswordBlur}
              maxWidth="100%"
              error={errors.password}
            />
          </Wrapper>
          <ButtonWrapper>
            <Button width="200px" disabled={isDisabled()}>
              {t('login')}
            </Button>
          </ButtonWrapper>
          <TextWrapper>
            <GreyText>{t('notAccount')}</GreyText>
            <Link href="/id/register" passHref>
              <Ref>{t('register')}</Ref>
            </Link>
          </TextWrapper>
        </Form>
      </IdContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  min-height: calc(100vh - 122px);

  @media (min-width: ${SIZES.TABLET}px) {
    min-height: calc(100vh - 88px);
  }
`;

const Form = styled.form``;

const Wrapper = styled.div`
  margin-bottom: 20px;
`;

const ButtonWrapper = styled.div`
  margin-top: 50px;
`;

const GreyText = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.text02};
`;

const TextWrapper = styled.div`
  display: flex;

  margin-top: 20px;
`;

const Ref = styled.a`
  display: block;

  margin-left: 5px;

  font-size: 14px;
  color: ${({ theme }) => theme.text};
`;
