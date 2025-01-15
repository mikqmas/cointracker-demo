import { createContext, useState, useContext, ReactNode } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

interface User {
    userID: string | null,
    token: string | null,
    signup: ((username: string, password: string) => Promise<boolean>) | null,
    login: ((username: string, password: string) => Promise<boolean>) | null,
    logout: () => void
}

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [userID, setUserID] = useState(localStorage.getItem('user_id') || '');
    const [token, setToken] = useState(localStorage.getItem('token') || '');

    const login = async (username: string, password: string) => {
        try {
            const response = await axios.post('http://localhost:8080/api/users/login', { username, password });
            const { access_token, user_id, error } = response.data;
            if (error) { 
                return {result: false, message: error};
            }
            setUserID(user_id);
            setToken(access_token);
            localStorage.setItem('token', access_token);
            localStorage.setItem('user_id', user_id);
            return {result: true, message: 'success'};
        } catch (e) {
            return {result: false, message: e};
        }
    };

    const signup = async (username: string, password: string) => {
        try {
            const response = await axios.post('http://localhost:8080/api/users/signup', { username, password });
            const { access_token, user_id, error } = response.data;
            if (error) { 
                return {result: false, message: error};
            }
            setUserID(user_id);
            setToken(access_token);
            localStorage.setItem('token', access_token);
            localStorage.setItem('user_id', user_id);
            return {result: true, message: 'success'};
        } catch (e) {
            return {result: false, message: e};
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
        signup,
        login,
        logout,
    };

    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
