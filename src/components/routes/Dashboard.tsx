import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import useApp from "../../hooks/useApp";
import { AboutMe } from "../../model/aboutme";
import { Project } from "../../model/project";
import { mockAboutme, mockProjects } from "../../utils/mock-response";
import AboutMeCard from "../cards/AboutMeCard";
import ProjectCard from "../cards/ProjectCard";
import { themes } from "../styles/ColorStyles";
import { MediumText } from "../styles/TextStyles";

interface Response {
  aboutme?: AboutMe;
  projects?: Project[];
}

const Dashboard = () => {
  const { t } = useTranslation();
  const [response, setResponse] = useState<Response | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const { addNotification, removeLastNotification } = useApp();

  useEffect(() => {
    async function retrieveInfo() {
      try {
        startSearch(t("loader.text"));
        const projects: Project[] = await mockProjects();
        const aboutme: AboutMe = await mockAboutme();
        setResponse({ aboutme, projects });
      } catch {
        console.log("Error");
        setError("User not found");
      } finally {
        stopSearch();
      }
    }

    function startSearch(msg: string) {
      setResponse(undefined);
      setError(undefined);
      addNotification(msg);
    }
  
    function stopSearch() {
      removeLastNotification();
    }

    retrieveInfo();
  }, [setResponse, t, addNotification, removeLastNotification]);

  return (
    <Wrapper>
      <ContentWrapper>
        {response && (
          <ResponseWrapper>
            <AboutMeWrapper>
              {response?.aboutme && <AboutMeCard aboutMe={response?.aboutme} />}
            </AboutMeWrapper>
            <ProjectWrapper>
              {response?.projects?.map((project, index) => (
                <ProjectCard project={project} key={index} />
              ))}
            </ProjectWrapper>
          </ResponseWrapper>
        )}

        {error && <ErrorMsg>{t("search.error")}</ErrorMsg>}
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  overflow: hidden;

  @media (min-width: 700px) {
    padding-bottom: 200px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1234px;
  margin: 0 auto;
  padding: 30px 30px 60px 30px;
  display: grid;

  @media (max-width: 450px) {
    padding: 30px 4px 60px 4px;
  }
`;

const ResponseWrapper = styled.div`
  display: grid;
  grid-template-columns: auto auto;

  @media (max-width: 1080px) {
    grid-template-columns: auto;
    grid-template-rows: auto auto;
  }
`;

const AboutMeWrapper = styled.div`
  display: grid;
  align-items: flex-start;

  @media (max-width: 810px) {
    align-items: center;
    justify-content: center;
  }
`;

const ProjectWrapper = styled.div`
  max-width: 2400px;
  margin: 0 auto;
  padding: 20px 30px 120px 30px;
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 40px;

  @media (max-width: 1440px) {
    justify-items: center;
    grid-template-columns: auto auto;
  }

  @media (max-width: 1080px) {  
    grid-template-columns: auto auto auto;
    gap: 20px;
  }

  @media (max-width: 920px) {
    grid-template-columns: auto auto;
  }

  @media (max-width: 700px) {
    grid-template-columns: auto;
    gap: 0px;
  }
`;

const ErrorMsg = styled(MediumText)`
  text-align: center;
  @media (prefers-color-scheme: dark) {
    color: ${themes.dark.text1};
  }
`;

export default Dashboard;
