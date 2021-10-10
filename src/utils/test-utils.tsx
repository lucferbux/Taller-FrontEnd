import { FC, ReactElement } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { render, RenderOptions } from "@testing-library/react";
import { AuthProvider } from "../context/AuthContext";




// eslint-disable-next-line react/prop-types,@typescript-eslint/no-explicit-any
const AllTheProviders: FC<any> = ({ children }) => (
  <Router>
        <AuthProvider>{children}</AuthProvider>
  </Router>
);

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "queries">
) => render(ui, { wrapper: AllTheProviders, ...options });

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };

export const isNotTestEnv = () => process.env.NODE_ENV !== "test";
