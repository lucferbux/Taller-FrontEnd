import React from 'react';
import styled from 'styled-components';
import { themes } from '../../styles/ColorStyles';

const Footer = () => {
  return (
    <Wrapper>
      <ContentWrapper></ContentWrapper>
    </Wrapper>
  );
};

export default Footer;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 240px;
  bottom: 0px;
  left: 0px;
  right: 0px;
  padding-top: 250px;
  background-color: ${themes.light.primary};

  @media (prefers-color-scheme: dark) {
    background-color: ${themes.dark.primary};
  }

  @media (max-width: 550px) {
    top: 10px;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  max-width: 660px;
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 40px;
  margin: 0px auto;
  padding: 30px 30px 60px 30px;
  box-sizing: border-box;
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    justify-items: center;
  }
`;
