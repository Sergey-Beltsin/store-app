import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styled from 'styled-components';
import { AddToCartIcon, HeartIcon } from '@/lib/icons';
import { Button, FocusVisible } from '@/UI/atoms';
import useTranslation from 'next-translate/useTranslation';

type Props = {
  href: string;
  title: string;
  price: string;
};

type WrapperProps = {
  flex?: boolean;
  padding?: boolean;
};

export const StoreCard: FC<Props> = ({ href, title, price }) => {
  const { t } = useTranslation('store');

  return (
    <Container>
      <Wrapper>
        <Link href={href} passHref>
          <Ref>
            <Image
              src="https://place-hold.it/300x300"
              layout="responsive"
              width={300}
              height={300}
            />
          </Ref>
        </Link>
        <FocusVisible>
          <AddToWishlist>
            <HeartIcon />
          </AddToWishlist>
        </FocusVisible>
      </Wrapper>
      <Wrapper padding>
        <Link href={href} passHref>
          <Ref>
            <Wrapper flex>
              <Title>{title}</Title>
              <Price>{price}</Price>
            </Wrapper>
          </Ref>
        </Link>
        <Button isOutlined>
          <Icon>
            <AddToCartIcon />
          </Icon>
          {t('addToCart')}
        </Button>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  position: relative;

  border-radius: 4px;
`;

const Ref = styled.a`
  display: block;

  text-decoration: none;

  cursor: pointer;
`;

const Wrapper = styled.div<WrapperProps>`
  ${({ flex }) => flex && 'display: flex;'}
  ${({ padding }) => padding && 'padding: 5px 10px'}

  text-decoration: none;
`;

const AddToWishlist = styled.button`
  position: absolute;
  top: 0;
  right: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 30px;
  height: 30px;
  padding: 0;

  cursor: pointer;

  background-color: transparent;
  border: none;

  & svg {
    width: 20px;
    height: 20px;

    & path {
      fill: ${({ theme }) => theme.icon};

      transition: 0.2s ease;
    }
  }
`;

const Icon = styled.div`
  margin-right: 10px;

  & svg {
    width: 25px;
    height: 25px;

    & path {
      fill: ${({ theme }) => theme.icon};

      transition: 0.2s ease;
    }
  }
`;

const Title = styled.span`
  font-size: 20px;
  color: ${({ theme }) => theme.text};
`;

const Price = styled.span`
  display: block;
  margin-left: 10px;

  font-size: 20px;
  color: ${({ theme }) => theme.text};
`;
