import { FC } from 'react';
import styled from 'styled-components';

import { LoginContainer } from '@/features/id/login';

const Login: FC = () => (
  <Container>
    <LoginContainer />
  </Container>
);

export default Login;

const Container = styled.div``;
