import {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export function useUser(){
    const [isAuth, setIsAuth] = useState(false);
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState(null);

    // Manage form errors---------------------
    // field errors
    const [loginFormError, setLoginFormError] = useState({
        user_email: "",
        user_password: "",
    });
    const [registerFormError, setRegisterFormError] = useState({
        user_name: "",
        user_email: "",
        user_password: "",
    });
    // validation error
    const [loginErrorValid, setLoginErrorValid] = useState("");
    const [registerErrorValid, setRegisterErrorValid] = useState("");

    // when the token has been updated
    useEffect(function(){
        localStorage.setItem("token", token);
    }, [token]);

    // when a login form has been submitted
    const navigate = useNavigate();

    const login = async function(loginFormData){
        setLoginFormError({user_email: "", user_password: ""});
        setLoginErrorValid("");

        const response = await axios.post("http://localhost:3001/api/users/login", loginFormData);

        if(await response.data.error) {
            // check if some field of the form is not valid
            const errorList = await response.data.errorList;
            console.log("erreur survenue lors de la validation du formulaire ");
            // console.log(errorList);
            setLoginFormError(prev => {
                const newErrors = {...prev};
                errorList.forEach(error => {
                    if (newErrors.hasOwnProperty(error.path)) {
                        newErrors[error.path] = error.message;
                    }
                });
                return newErrors;
            });
        }
        else if (await response.data.errorValid) {
            // verifying if an error occurred when the validation form (credential error)
            setLoginErrorValid(await response.data.message);
        }
        else {

            //get user informations
            console.log("aucune erreur lors de la validation du formulaire ");
            const data = await response.data;

            // save token in the localStorage
            setToken(data.token);

            // user is authenticated
            setIsAuth(true);

            // save user
            setUser(data.user);
            console.log("user authenticated ");
            navigate("/");
        }

    };

    const logout = function(){
        setToken(null);
        localStorage.removeItem("token");
        setUser(null);
        setIsAuth(false);
        navigate("/");
    };

    const checkIfWasUserLoggedIn = async function(){
        // this function check if user was logged in when a browser was reopened

        const token = localStorage.getItem("token");
        console.log(token);

        if(token){
            const response = await axios.post("http://localhost:3001/api/users/check-token/", {token});
            const data = await response.data;
            if (data.error) {
                console.log(data.message);
                localStorage.removeItem("token");
            } else {
                const userId = data.userId;
                console.log(data.userId);
                // get user login
                const response2 = await axios.get(`http://localhost:3001/api/users/get-user/${userId}`, {
                    headers: {authorization: `Bearer ${token}`}
                });
                const data2 = await response2.data;
                console.log(data2);
                setIsAuth(true);
                setUser(data2.user);
            }
        }
    };

    return {
        isAuth,
        login,
        logout,
        user,
        token,
        loginFormError,
        registerFormError,
        registerErrorValid,
        loginErrorValid,
        checkIfWasUserLoggedIn,
    };
}