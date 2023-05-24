import React from 'react';
import styled from 'styled-components';
import { themes } from '../../styles/ColorStyles';
import { MediumText } from '../../styles/TextStyles';

interface AboutMeCardRowProps {
  title: string;
  value: string | number;
  isLink?: boolean;
}

const AboutMeCardRow = (props: AboutMeCardRowProps) => {
  const formatDate = (value: string | number): string => {
    if (typeof value === 'number') {
      const date = new Date(value);
      return date.toLocaleDateString();
    } else {
      return value;
    }
  };

  return (
    <InfoDetailBox>
      <InfoKey>{props.title}</InfoKey>
      <InfoValueWrapper>
        {props.isLink ? (
          <LinkText href={props.value as string} target="_blank" rel="noopener">
            {formatDate(props.value)}
          </LinkText>
        ) : (
          <InfoValue>{formatDate(props.value)}</InfoValue>
        )}
      </InfoValueWrapper>
    </InfoDetailBox>
  );
};

const InfoDetailBox = styled.div`
  display: grid;
  grid-template-columns: auto auto;
  justify-content: start;
  column-gap: 6px;
`;

const InfoValueWrapper = styled.div``;

const InfoKey = styled(MediumText)`
  font-weight: bold;
  color: ${themes.light.text1};

  @media (prefers-color-scheme: dark) {
    color: ${themes.dark.text1};
  }
`;

const InfoValue = styled(MediumText)`
  color: ${themes.light.text1};
  margin-bottom: 8px;

  @media (prefers-color-scheme: dark) {
    color: ${themes.dark.text1};
  }
`;

const LinkText = styled.a`
  cursor: pointer;
  font-weight: normal;
  font-size: 17px;
  line-height: 130%;
  @media (max-width: 450px) {
    font-size: 15px;
    line-height: 100%;
  }

  color: ${themes.dark.primary};

  @media (prefers-color-scheme: dark) {
    color: ${themes.light.primary};
  }
`;

export default AboutMeCardRow;
