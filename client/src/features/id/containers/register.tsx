import { FC } from 'react';
import styled from 'styled-components';

import { IdContainer } from '@/UI/atoms';
import useTranslation from 'next-translate/useTranslation';

export const RegisterContainer: FC = () => {
  const { t } = useTranslation('id');

  return (
    <Container>
      <IdContainer>
        <Form />
      </IdContainer>
    </Container>
  );
};

const Container = styled.div``;

const Form = styled.form``;
