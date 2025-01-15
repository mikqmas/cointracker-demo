import { createContext, useState, useContext, ReactNode } from 'react';
import axios from 'axios';

const dummyUser: User = {
    userID: null,
    token: null,
    login: null,
    logout: () => {}
}
const AuthContext = createContext(dummyUser);

export const useAuth = () => useContext(AuthContext);

interface User {
    userID: string | null,
    token: string | null,
    login: ((username: string, password: string) => Promise<boolean>) | null,
    logout: () => void
}

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [userID, setUserID] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || '');

    const login = async (username: string, password: string) => {
        try {
            const response = await axios.post('http://localhost:8080/api/users/login', { username, password });
            const { access_token, user_id } = response.data;
            if (!access_token || !user_id) {
                throw Error(`access token: ${access_token}, userid: ${user_id}`)
            }
            setUserID(user_id);
            setToken(access_token);
            localStorage.setItem('token', access_token);
            localStorage.setItem('user_id', user_id);
            return true;
        } catch (error) {
            console.error("Login failed:", error);
            return false;
        }
    };

    const logout = () => {
        setUserID(null);
        setToken('');
        localStorage.removeItem('token');
        localStorage.removeItem('user_id');
    };

    const user: User = {
        userID,
        token,
        login,
        logout,
    };

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
