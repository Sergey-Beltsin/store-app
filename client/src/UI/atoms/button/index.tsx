/* eslint-disable react/jsx-props-no-spreading */
import { FC } from 'react';
import styled from 'styled-components';

import { FocusVisible } from '@/UI/atoms';

type Props = {
  isOutlined?: boolean;
  disabled?: boolean;
  width?: string;
};

export const Button: FC<Props> = ({
  isOutlined,
  disabled,
  width,
  children,
  ...props
}) => (
  <FocusVisible>
    <Container
      isOutlined={isOutlined}
      width={width}
      disabled={disabled}
      type="button"
      data-testid="button"
      {...props}
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
  box-shadow: 0 5px 7px rgba(0, 0, 0, 0.5);

  transition: 0.2s ease;

  &:hover,
  &:focus {
    background-color: ${({ theme }) => theme.common.primaryHovered};
    box-shadow: 0 3px 2px rgba(0, 0, 0, 0.3);
  }

  &:disabled {
    background-color: ${({ theme }) => theme.common.disabled};
    box-shadow: none;
    opacity: 0.5;
  }

  ${({ isOutlined, theme }) =>
    isOutlined &&
    `
    color: ${theme.text};

    background-color: transparent;
    border: 1px solid ${theme.common.primary};
    box-shadow: none;

    &:hover,
    &:focus {
      color: ${theme.common.textWhite};

      background-color: ${theme.common.primary};
      box-shadow: 0 3px 2px rgba(0, 0, 0, 0.3);
      & svg path {
        fill: ${theme.common.textWhite};
      }
    }

    &:disabled {
      background-color: transparent;
      border-color: ${theme.common.disabled};
    }
  `}
`;
