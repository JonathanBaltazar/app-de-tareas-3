import { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export let AuthContext = createContext();

import { registerUser, loginUser, verifyToken } from "../api/auth";

export let AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function checkToken() {
            try {
                let cookies = Cookies.get();
                let response = await verifyToken(cookies);
                setUser(response.data);
                setIsAuthenticated(true);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
            }
        }
        checkToken();
    }, []);

    useEffect(() => {
        if (errors.length > 0) {
            let timerId = setTimeout(() => {
                setErrors([]);
            }, 10000);
            return () => clearTimeout(timerId);
        }
    }, [errors]);

    let signup = async (data) => {
        try {
            let response = await registerUser(JSON.stringify(data));
            setUser(response.data);
            setIsAuthenticated(true);
        } catch (error) {
            setErrors(error.response.data);
            setIsAuthenticated(false);
            setUser(null);
        }
    };
    let login = async (data) => {
        try {
            let response = await loginUser(JSON.stringify(data));
            setUser(response.data);
            setIsAuthenticated(true);
        } catch (error) {
            setErrors(error.response.data);
            setIsAuthenticated(false);
            setUser(null);
        }
    };
    return (
        <AuthContext.Provider
            value={{
                user,
                signup,
                errors,
                isAuthenticated,
                login,
                loading,
                setIsAuthenticated,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
