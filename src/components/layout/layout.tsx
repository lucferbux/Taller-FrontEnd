import React from "react";
import { GlobalStyle } from "../styles/GlobalStyle";
// import Footer from "./footer";
import Header from "./header";

interface LayoutProps {
  children: React.ReactNode;
}


const Layout = (props: LayoutProps) => {
  return (
    <>
      <GlobalStyle/>
      <Header/>
      <main>{props.children}</main>
      {/* <Footer/> */}
    </>
  )
}

export default Layout
