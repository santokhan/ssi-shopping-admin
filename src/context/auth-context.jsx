import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import api from '../axios/api';

const tokenAge = 60 * 60 * 24 * 2 * 1000; // 2 days

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [tokenExpiry, setTokenExpiry] = useState(null);
    // const [authenticating, setAuthenticating] = useState(false);

    // Load token from local storage on component mount
    useEffect(() => {
        const storedToken = localStorage.getItem('accessToken');
        const storedExpiry = localStorage.getItem('tokenExpiry');
        if (storedToken) {
            setToken(prev => ({ ...prev, access: storedToken }));
            if (storedExpiry) {
                setTokenExpiry(Number(storedExpiry))
            }
        }

    }, [])

    const signin = (user, token, expiresIn = tokenAge) => {
        // Save user and token
        // Save token to local storage

        // setUser(user);

        setToken(token);
        setTokenExpiry(Date.now() + expiresIn); // Convert expiresIn to milliseconds

        localStorage.setItem('accessToken', token.access);
        localStorage.setItem('refreshToken', token.refresh);
        localStorage.setItem('tokenExpiry', String(Date.now() + expiresIn));
    };

    const signout = () => {
        setToken(null);
        setTokenExpiry(null);

        // Clear token from local storage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('tokenExpiry');
    };

    const isAuthenticated = useCallback(() => {
        if (token?.access /**&& Date.now() < tokenExpiry */) {
            return true;
        }
        return false;
    }, [token]);

    const rotateToken = () => {
        // Implement logic to refresh the token from your backend
        // For example, make a request to your backend to obtain a new token
        // Update the token and expiry accordingly
        api.post('token/refresh', { refresh: token.refresh }).then((res) => {
            if (res) {
                signin(null, res.data);
            }
        }).catch((err) => {
            console.log(err);
        });
    };

    // Automatically rotate token before expiry
    useEffect(() => {
        const tokenRefreshInterval = setInterval(() => {
            // generate new token if user already logged in
            if (token) {
                rotateToken();
            }
        }, tokenAge); // Rotate token every minute, adjust as needed

        return () => clearInterval(tokenRefreshInterval);
    }, []);

    return (
        <AuthContext.Provider value={{ token, signin, signout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (context === null) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};
