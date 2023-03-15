import React from 'react';
import styled from 'styled-components';
import background from './background-landing.svg';
import backgroundDark from './background-landing-dark.svg';

const WaveLanding = () => {
  return (
    <Wrapper>
      <Wave src={background} alt="Background Image" />
    </Wrapper>
  );
};

export default WaveLanding;

const Wrapper = styled.div`
  position: relative;
`;
const Wave = styled.img`
  position: absolute;
  top: -100px;
  z-index: -1;
  @media (min-width: 1440px) {
    width: 100%;
  }
  @media (prefers-color-scheme: dark) {
    content: url(${backgroundDark});
  }
`;
