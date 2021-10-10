/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, ReactNode, useCallback, useReducer } from "react";
import notificationsReducer from "./notificationsReducer";
import { POP_NOTIFICATION, PUSH_NOTIFICATION } from "./constants";

const AppContext = createContext<any>({
  notifications: [],
});

interface Props {
  children: ReactNode;
}

export function AppProvider({ children }: Props) {
  const [notifications, setNotification] = useReducer(notificationsReducer, []);

  const addNotification = useCallback((message: string) => {
    setNotification({ type: PUSH_NOTIFICATION, payload: message });
  }, []);

  const removeLastNotification = useCallback(() => {
    setNotification({ type: POP_NOTIFICATION });
  }, []);

  return (
    <AppContext.Provider
      value={{
        notifications,
        addNotification,
        removeLastNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContext;
