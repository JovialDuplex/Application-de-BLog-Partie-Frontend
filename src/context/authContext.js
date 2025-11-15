import {useContext, createContext, useState, useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useUser} from "../hooks/useUser";

//creating context
const AuthContext = createContext();


// creating a context provider for send information in my application
export const AuthProvider = ({ children }) => {
    const {
        isAuth,
        login,
        logout,
        user,
        token,
        loginFormError,
        registerFormError,
        registerErrorValid,
        loginErrorValid,
        checkIfWasUserLoggedIn

    } = useUser();

    return (
      <AuthContext.Provider value={{checkIfWasUserLoggedIn, isAuth, login, logout, user, token, loginFormError, loginErrorValid, registerFormError, registerErrorValid}}>
          {children}
      </AuthContext.Provider>
    );
}

//export use auth context
export const useAuthContext = ()=> useContext(AuthContext)

