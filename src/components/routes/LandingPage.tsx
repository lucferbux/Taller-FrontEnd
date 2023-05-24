import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import WaveLanding from '../background/WaveLanding';
import { themes } from '../../styles/ColorStyles';
import { H1 } from '../../styles/TextStyles';
import Lottie from 'lottie-react';
import animationData from './landing.json';

const LandingPage = () => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <WaveLanding />
      <ContentWrapper>
        <Title>{t('landing.title')}</Title>
      </ContentWrapper>
      <LottieWrapper>
        <Lottie animationData={animationData} loop={true} />
      </LottieWrapper>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  overflow: hidden;
  height: 1200px;
  @media (min-width: 2500px) {
    padding-bottom: 100px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1234px;
  margin: 0 auto;
  padding: 30px 30px 60px 30px;
  display: grid;

  @media (max-width: 750px) {
    grid-template-columns: auto;
    justify-content: center;
    gap: 40px;
  }

  @media (max-width: 450px) {
    padding: 10px;
  }
`;

const Title = styled(H1)`
  margin-top: 80px;
  font-size: 70px;
  color: ${themes.dark.text1};
  text-align: center;

  @media (max-width: 830px) {
    margin-top: 20px;
  }

  @media (max-width: 450px) {
    font-size: 60px;
  }
`;
const LottieWrapper = styled.div`
  width: 600px;
  height: 600px;
  margin: 0px auto;
  outline: none;

  @media (max-width: 750px) {
    width: 400px;
    height: 400px;
  }

  @media (max-width: 450px) {
    width: 300px;
    height: 300px;
  }
`;

export default LandingPage;
