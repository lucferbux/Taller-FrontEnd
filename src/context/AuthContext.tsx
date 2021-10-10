import { createContext, ReactNode, useCallback, useEffect, useState } from "react";
import { getCurrentUser, isTokenActive, setLogoutIfExpiredHandler, logout as logoutService, setAuthToken } from "../utils/auth";
import { mockLogin } from "../utils/mock-response";


const AuthContext = createContext<any>({
    user: undefined,
});


interface Props {
    children: ReactNode;
}

export interface User {
    active: boolean;
    id: number;
    userName: string;
}

export function AuthProvider({ children }: Props) {

    const [user, setUser] = useState<User | undefined>(getCurrentUser());

    const loadUser = () => {
        const user = getCurrentUser();
        setUser(user)
    }

    useEffect(() => {
        if(isTokenActive()) {
            setLogoutIfExpiredHandler(setUser);
            loadUser();
        }
    }, []);

    const login = useCallback(
        async (username: string, password: string) => {
            try {
                const result = await mockLogin(username, password);
                setAuthToken(result.access_token, result.expires_in);
                setLogoutIfExpiredHandler(setUser);
                loadUser();
            } catch (apiError) {
                throw new Error();
            }
        }, 
    [setUser])

    const logout = useCallback(() => {
        logoutService();
        setUser(undefined);
    }, [])

    return (
        <AuthContext.Provider value={ {user, login, logout} }>{children}</AuthContext.Provider>
    )
}


export default AuthContext;