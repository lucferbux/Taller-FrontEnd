import React from 'react';
import styled from 'styled-components';
import icnLoader from './loader.svg';
import { themes } from '../../styles/ColorStyles';
import { Caption } from '../../styles/TextStyles';

export type LoaderProps = {
  message: string;
};

const Loader = ({ message }: LoaderProps) => (
  <LoaderWrapper>
    <LoaderCard>
      <LoaderImg src={icnLoader} alt={message} />
      <LoaderMsg>{message}</LoaderMsg>
    </LoaderCard>
  </LoaderWrapper>
);

export default Loader;

const LoaderWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${themes.light.loadingScreen};
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoaderCard = styled.div`
  font-size: 24px;
  text-align: center;
  color: ${themes.dark.text1};
`;

const LoaderImg = styled.img`
  margin: 0 auto;
  margin-bottom: 20px;
`;

const LoaderMsg = styled(Caption)``;
