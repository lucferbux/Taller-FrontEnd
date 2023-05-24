import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Project } from '../../model/project';
import { themes } from '../../styles/ColorStyles';
import { Caption, H1 } from '../../styles/TextStyles';

const Admin = () => {
  const { t } = useTranslation();
  const emptyProjectInput: Partial<Project> = {
    title: '',
    description: '',
    link: '',
    tag: '',
    version: ''
  };

  const [projectInput, setProjectInput] = useState<Partial<Project>>(emptyProjectInput);

  const readyToSubmit =
    projectInput.title !== '' &&
    projectInput.description !== '' &&
    projectInput.link !== '' &&
    projectInput.tag !== '' &&
    projectInput.version !== '';

  async function postProject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const errorMessage = !readyToSubmit ? t('admin.err_invalid_form') : undefined;
    const newProject = {
      ...projectInput,
      title: projectInput?.title || '',
      description: projectInput?.description || '',
      tag: projectInput?.tag || '',
      version: projectInput?.version || '',
      link: projectInput?.link || '',
      timestamp: projectInput?.timestamp || Date.now()
    };

    console.log(newProject);
    console.log(errorMessage);
  }

  function onChange(e: ChangeEvent<HTMLInputElement>, attribute: keyof Project) {
    setProjectInput({ ...projectInput, [attribute]: e.target.value });
  }

  function onReset() {
    setProjectInput(emptyProjectInput);
  }

  return (
    <Wrapper>
      {/* {status === 'loading' && <Loader message={t('loader.text')} />} */}
      <ContentWrapper>
        <TitleForm>{t('admin.header')}</TitleForm>
        <LoginPannel onSubmit={postProject} onReset={onReset}>
          {/* {error && <ErrorDescription>{error.message}</ErrorDescription>} */}
          <LoginForm
            name="title"
            type="text"
            placeholder={t('admin.input_title')}
            value={projectInput.title}
            onChange={(e) => onChange(e, 'title')}
          />
          <LoginForm
            name="description"
            type="text"
            placeholder={t('admin.input_description')}
            value={projectInput.description}
            onChange={(e) => onChange(e, 'description')}
          />
          <LoginForm
            name="link"
            type="text"
            placeholder={t('admin.input_link')}
            value={projectInput.link}
            onChange={(e) => onChange(e, 'link')}
          />
          <LoginForm
            name="tags"
            type="text"
            placeholder={t('admin.input_tags')}
            value={projectInput.tag}
            onChange={(e) => onChange(e, 'tag')}
          />
          <LoginForm
            name="version"
            type="text"
            placeholder={t('admin.input_version')}
            value={projectInput.version}
            onChange={(e) => onChange(e, 'version')}
          />
          <ButtonWrapper>
            <ButtonCancel
              disabled={status === 'loading'}
              type="reset"
              value={
                t('admin.button_delete') != null ? (t('admin.button_delete') as string) : 'Delete'
              }
            />
            <ButtonForm
              disabled={status === 'loading' || !readyToSubmit}
              type="submit"
              value={t('admin.button_accept')}
            />
          </ButtonWrapper>
        </LoginPannel>
      </ContentWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  overflow: hidden;
  height: 100%;
  @media (min-width: 2500px) {
    padding-bottom: 100px;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1234px;
  height: 100%;
  margin: 0 auto;
  padding: 30px 30px 180px 30px;
  display: grid;
  grid-template-columns: auto;
  justify-items: center;
  row-gap: 20px;

  @media (max-width: 750px) {
    justify-content: center;
    padding: 30px 0px 180px 0px;
  }

  @media (max-width: 500px) {
    justify-content: stretch;
    justify-items: stretch;
    padding: 30px 0px 180px 0px;
  }
`;

const TitleForm = styled(H1)`
  text-align: center;
  @media (prefers-color-scheme: dark) {
    color: ${themes.dark.text1};
  }
`;

const LoginPannel = styled.form`
  padding: 20px 40px;
  width: 400px;
  ${themes.light.card};
  border-radius: 8px;

  display: grid;
  row-gap: 16px;
  grid-template-rows: auto;

  @media (prefers-color-scheme: dark) {
    ${themes.dark.card};
  }

  @media (max-width: 500px) {
    width: auto;
    margin: 0px 20px;
    padding: 20px;
  }
`;

const ErrorDescription = styled(Caption)`
  color: ${themes.light.warning};
`;

const LoginForm = styled.input`
  border: none;
  border-radius: 3px;
  width: 100%;
  height: 36px;
  color: ${themes.light.text1};
  background-color: ${themes.light.backgroundForm};
  padding-left: 8px;

  @media (prefers-color-scheme: dark) {
    color: ${themes.dark.text1};
    background-color: ${themes.dark.backgroundForm};
  }
`;

const ButtonWrapper = styled.div`
  display: grid;
  grid-template-columns: 100px 100px;
  grid-gap: 10px;
  justify-content: end;

  @media (max-width: 500px) {
    grid-template-columns: auto;
    grid-template-rows: auto auto;
    justify-content: stretch;
  }
`;

const ButtonForm = styled.input`
  height: 36px;
  border-radius: 4px;
  border: none;
  background-color: ${themes.light.primary};
  color: ${themes.dark.text1};
  opacity: ${(props) => (props.disabled ? '0.5' : '1')};

  @media (prefers-color-scheme: dark) {
    background-color: ${themes.dark.primary};
  }
`;

const ButtonCancel = styled(ButtonForm)`
  background-color: ${themes.light.warning};
`;

export default Admin;
