import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { AboutMe } from '../../model/aboutme';
import { themes } from '../../styles/ColorStyles';
import AboutMeCardRow from './AboutMeCardRow';

import avatarCard from './Avatar.jpg';

interface AboutMeCardProps {
  aboutMe: AboutMe;
}

const AboutMeCard = (props: AboutMeCardProps) => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <ImageWrapper src={avatarCard} />
      <InfoWrapper>
        <InfoSection>
          <AboutMeCardRow title={t('aboutMeCard.name')} value={props.aboutMe.name} />
          {props.aboutMe.birthday && (
            <AboutMeCardRow title={t('aboutMeCard.birthdate')} value={props.aboutMe.birthday} />
          )}
          {props.aboutMe.nationality && (
            <AboutMeCardRow
              title={t('aboutMeCard.nationality')}
              value={props.aboutMe.nationality}
            />
          )}
        </InfoSection>

        <InfoSection>
          {props.aboutMe.job && (
            <AboutMeCardRow title={t('aboutMeCard.occupation')} value={props.aboutMe.job} />
          )}
          {props.aboutMe.github && (
            <AboutMeCardRow
              title={t('aboutMeCard.github')}
              value={props.aboutMe.github}
              isLink={true}
            />
          )}
        </InfoSection>
      </InfoWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  ${themes.light.card};
  padding: 20px;
  position: relative;
  margin: 20px;
  border-radius: 20px;
  display: grid;
  grid-template-rows: auto auto;
  place-items: center;
  row-gap: 30px;
  min-width: 300px;

  @media (prefers-color-scheme: dark) {
    ${themes.dark.card};
  }

  @media (max-width: 1080px) {
    padding: 20px 40px 40px 40px;
    grid-template-columns: 40% auto;
    grid-template-rows: auto;
    column-gap: 60px;
  }

  @media (max-width: 810px) {
    padding: 20px;
    grid-template-columns: auto;
    grid-template-rows: auto auto;
    max-width: 600px;
    column-gap: 0px;
  }

  & .icon {
    position: absolute;
    left: 12px;
    bottom: 12px;
    width: 30px;
    fill: black;

    @media (prefers-color-scheme: dark) {
      fill: white;
    }
  }
`;

const ImageWrapper = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 12px;

  @media (max-width: 1024px) {
    max-height: 400px;
  }
`;

const InfoWrapper = styled.div`
  display: grid;
  row-gap: 30px;
  align-content: start;
  justify-self: start;
`;

const InfoSection = styled.div`
  display: grid;
  row-gap: 2px;
  align-content: start;
  justify-self: start;
`;

export default AboutMeCard;
