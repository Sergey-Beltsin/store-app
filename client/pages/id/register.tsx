import { FC } from 'react';
import styled from 'styled-components';

import { RegisterContainer } from '@/features/id/containers/register';

const Register: FC = () => (
  <Container>
    <RegisterContainer />
  </Container>
);

export default Register;

const Container = styled.div``;
