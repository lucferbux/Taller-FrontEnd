import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { themes } from "../../styles/ColorStyles";

export const home = {
  title: "nav.home",
  link: "/",
};

export const menuData = [
  {
    title: "nav.dashboard",
    link: "/dashboard",
  },
  {
    title: "nav.admin",
    link: "/admin",
  },
];

const Header = () => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Link to={home.link}>
        {/* TODO: Change title to logo */}
        <LinkButton>{t(home.title)}</LinkButton>
      </Link>
      <MenuWrapper count={menuData.length}>
        {menuData.map((item, index) => (
          <Link to={item.link} key={index}>
            <LinkButton>{t(item.title)}</LinkButton>
          </Link>
        ))}
      </MenuWrapper>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* max-width: 1234px; */
  height: 30px;
  left: 0px;
  right: 0px;
  margin: 0px auto;
  padding: 30px 30px;
  z-index: 3;
  background-color: ${themes.light.primary};

  @media (prefers-color-scheme: dark) {
    background-color: ${themes.dark.primary};
  }
`;
interface MenuWrapperProps {
  count: number;
}

const MenuWrapper = styled.div<MenuWrapperProps>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.count}, auto);
  gap: 30px;
`;

const LinkButton = styled.p`
  color: ${themes.dark.text1};
`;

// const Logo = styled.img`
//   height: 30px;
// `;
