import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [state, setState] = useState({
        isAuth: false,
        isMail: null
    })

    const userLogin = (payload) => {
        setState({
            ...state,
            isAuth: true,
            isMail: payload
        })
    }
    const userLogout = () => {
        setState({
            ...state,
            isAuth: false,
            isMail: null
        })
    }

    return (
        <AuthContext.Provider value={{ state, userLogin, userLogout }}>
            {children}
        </AuthContext.Provider>
    )
}