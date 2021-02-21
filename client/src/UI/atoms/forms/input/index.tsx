import { FC, ReactNode, useState } from 'react';
import styled from 'styled-components';

import { FocusVisible } from '@/UI/atoms';
import useTranslation from 'next-translate/useTranslation';

type Props = {
  value?: string;
  onChange?: (value: string) => void;
  error?: string;
  placeholder?: string;
  maxWidth?: string;
  icon?: ReactNode;
};

type ContainerProps = {
  maxWidth: string;
};

type InputProps = {
  error: boolean;
};

export const Input: FC<Props> = ({
  value,
  onChange,
  error,
  placeholder,
  maxWidth,
  icon,
}) => {
  const { t } = useTranslation('id');
  const [localValue, setLocalValue] = useState(value || '');

  return (
    <>
      <Container maxWidth={maxWidth}>
        <FocusVisible maxWidth={maxWidth}>
          <StyledInput
            value={value || localValue}
            onChange={({ target }) =>
              value ? onChange(target.value) : setLocalValue(target.value)
            }
            error={!!error}
            placeholder={placeholder}
            data-testid="input"
          />
          {icon && <Icon>{icon}</Icon>}
        </FocusVisible>
      </Container>
      {error && <ErrorText>{t(`errors.${error}`)}</ErrorText>}
    </>
  );
};

const Container = styled.div<ContainerProps>`
  position: relative;

  width: 100%;
  max-width: ${({ maxWidth }) => maxWidth || '400px'};
  height: 30px;

  background-color: ${({ theme }) => theme.input};
  border-radius: 4px;

  transition: 0.2s ease;
`;

const StyledInput = styled.input<InputProps>`
  width: calc(100% - 20px);
  height: 30px;
  padding: 0 10px;

  color: ${({ theme }) => theme.text};

  background-color: transparent;
  border: none;
  outline: none;

  transition: 0.2s ease;

  &.focus-visible::placeholder {
    opacity: 0.3;
  }

  ${({ error, theme }) =>
    error &&
    `
    border-color: ${theme.common.red};
  `}
`;

const ErrorText = styled.span`
  display: block;

  margin-top: 10px;
  font-size: 12px;

  color: ${({ theme }) => theme.common.red};

  animation: errorTextIn 0.2s;

  @keyframes errorTextIn {
    from {
      margin-top: -10px;
    }
  }
`;

const Icon = styled.div`
  position: absolute;
  top: 0;
  right: 10px;
  bottom: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  pointer-events: none;

  opacity: 0.8;

  & svg {
    width: 15px;
    height: 15px;

    & path {
      fill: ${({ theme }) => theme.icon};

      transition: 0.2s ease;
    }
  }
`;
