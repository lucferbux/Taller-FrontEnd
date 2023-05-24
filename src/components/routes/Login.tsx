import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useAuth from '../../hooks/useAuth';
import { themes } from '../../styles/ColorStyles';
import { Caption, H1 } from '../../styles/TextStyles';
import Loader from '../elements/Loader';

const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { login, isLoading } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  async function doLogin(event: FormEvent<HTMLFormElement>) {
    dismissError();
    event.preventDefault();
    if (!readyToSubmit()) {
      setErrorMsg(t('login.err_usr_pass'));
      return;
    }

    try {
      await login(username, password);
      navigate('/admin');
    } catch (e) {
      setErrorMsg(t('login.err_inv_lgn'));
    }
  }

  function onChangeAnyInput() {
    setErrorMsg('');
  }

  function onChangeUsername(e: ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
    onChangeAnyInput();
  }

  function onChangePassword(e: ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
    onChangeAnyInput();
  }

  function readyToSubmit(): boolean {
    return username !== '' && password !== '';
  }

  function dismissError() {
    setErrorMsg('');
  }

  return (
    <Wrapper>
      {isLoading && <Loader message={t('loader.text')} />}
      <ContentWrapper>
        <TitleForm>{t('login.login_title')}</TitleForm>
        <LoginPannel onSubmit={doLogin}>
          {errorMsg && <ErrorDescription>{errorMsg}</ErrorDescription>}
          <LoginForm
            name="email"
            type="email"
            placeholder={t('login.email_placeholder')}
            value={username}
            onChange={onChangeUsername}
          />
          <LoginForm
            name="password"
            type="password"
            placeholder={t('login.password_placeholder')}
            value={password}
            onChange={onChangePassword}
          />
          <ButtonForm
            type="submit"
            value={t('login.button_login') != null ? (t('login.button_login') as string) : 'Log In'}
          />
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

const ButtonForm = styled.input`
  height: 36px;
  border-radius: 4px;
  border: none;
  background-color: ${themes.light.primary};
  color: ${themes.dark.text1};

  @media (prefers-color-scheme: dark) {
    background-color: ${themes.dark.primary};
  }
`;

export default Login;
