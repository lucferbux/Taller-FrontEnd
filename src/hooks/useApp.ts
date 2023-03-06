import { useContext } from "react";
import AppContext from "../context/AppContext/AppContext";

export default function useApp() {
  const context = useContext(AppContext);

  return context;
}
