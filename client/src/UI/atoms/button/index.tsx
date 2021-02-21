/* eslint-disable react/jsx-props-no-spreading */
import { FC } from 'react';
import styled from 'styled-components';

import { FocusVisible } from '@/UI/atoms';

type Props = {
  isOutlined?: boolean;
  width?: string;
};

export const Button: FC<Props> = ({
  isOutlined,
  children,
  width,
  ...props
}) => (
  <FocusVisible>
    <Container
      isOutlined={isOutlined}
      width={width}
      {...props}
      data-testid="button"
    >
      {children}
    </Container>
  </FocusVisible>
);

const Container = styled.button<Props>`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 40px;
  padding: 0 15px;
  ${({ width }) => width && `width: ${width};`}

  color: ${({ theme }) => theme.common.textWhite};

  cursor: pointer;
  background-color: ${({ theme }) => theme.common.primary};
  border: none;
  border-radius: 4px;

  transition: 0.2s ease;

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.common.primaryHovered};
  }

  ${({ isOutlined, theme }) =>
    isOutlined &&
    `
    background-color: transparent;
    border: 1px solid ${theme.common.primary};
    color: ${theme.text};

    &:hover,
    &:focus {
      background-color: ${theme.common.primary};
      color: ${theme.common.textWhite};
      & svg path {
        fill: ${theme.common.textWhite};
      }
    }
  `}
`;
