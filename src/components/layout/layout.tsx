import React from "react";
import { GlobalStyle } from "../../styles/GlobalStyle";
// import Footer from "./footer";
import { Helmet } from "react-helmet";
import { themes } from "../../styles/ColorStyles";
import Header from "./header";
import { useTranslation } from "react-i18next";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = (props: LayoutProps) => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet
        title={t("meta.title")}
        meta={[
          {
            name: 'description',
            content: t("meta.description")
          },
          {
            name: 'apple-mobile-web-app-status-bar-style',
            content: 'default'
          },
          {
            name: "theme-color",
            content: themes.light.primary,
            media: "(prefers-color-scheme: light)",
          },
          {
            name: "theme-color",
            content: themes.dark.primary,
            media: "(prefers-color-scheme: dark)",
          },
        ]}
      />
      <GlobalStyle />
      <Header />
      <main>{props.children}</main>
      {/* <Footer/> */}
    </>
  );
};

export default Layout;
