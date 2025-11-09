import {useContext, createContext, useState} from "react";

// creating context
const AuthContext = createContext();

// creating a context provider for send informations in my application
export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);

    return (
      <AuthContext.Provider value={{isAuth}}>
          {children}
      </AuthContext.Provider>
    );
}

//export use auth context
export const useAuthContext = ()=> useContext(AuthContext)

