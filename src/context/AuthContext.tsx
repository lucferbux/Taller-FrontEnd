import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react";
import { User } from "../model/user";
import {
  getCurrentUser,
  isTokenActive,
  setLogoutIfExpiredHandler,
  logout as logoutService,
  setAuthToken,
} from "../utils/auth";
import { mockLogin } from "../utils/mock-response";

const AuthContext = createContext<any>({
  user: undefined,
});

interface Props {
  children: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | undefined>(getCurrentUser());

  const loadUser = useCallback(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  useEffect(() => {
    if (isTokenActive()) {
      setLogoutIfExpiredHandler(setUser);
      loadUser();
    } else {
      logoutService();
      setUser(undefined);
    }
  }, [loadUser]);

  const login = useCallback(
    async (username: string, password: string) => {
      try {
        const result = await mockLogin(username, password);
        console.log(result);
        setAuthToken(result.token);
        setLogoutIfExpiredHandler(setUser);
        loadUser();
      } catch (apiError) {
        throw new Error();
      }
    },
    [setUser, loadUser]
  );

  const logout = useCallback(() => {
    logoutService();
    setUser(undefined);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, loadUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
