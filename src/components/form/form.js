import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Autoplay, Pagination} from "swiper/modules";
import {useAuthContext} from "../../context/authContext";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import image19 from "../../assets/images/image19.png";
import image18 from "../../assets/images/image18.png";
import image17 from "../../assets/images/image17.png";
import style from "./form.module.css";
import "swiper/swiper.css";

const Form = function(){
    const [activeForm, setActiveForm] = useState(false);
    const [viewPasswordLogin, setViewPasswordLogin] = useState(false);
    const [loginFormData, setLoginFormData] = useState({
        user_email: "",
        user_password: "",
    });
    const [registerFormData, setRegisterFormData] = useState({
        user_name: "",
        user_email: "",
        user_password: "",
    });

    // get context information
    const {isAuth, login, loginFormError, loginErrorValid} = useAuthContext();

    //control inputs of form
    const changeLoginValues = (event)=>{
        setLoginFormData({...loginFormData, [event.target.name]: event.target.value});
    }
    const changeRegisterValues = (event)=>{
        setRegisterFormData({...registerFormData, [event.target.name]: event.target.value});
    }

    // functions for displaying each form
    const displayLoginForm = ()=>setActiveForm(false);
    const displayRegisterForm = ()=>setActiveForm(true);

    const toogleViewPassword = ()=>{setViewPasswordLogin(!viewPasswordLogin);}
    const navigate = useNavigate();

    // reset all forms when we change form
    // useEffect(()=>{
    //     setLoginFormData({user_email: "", user_password: "",});
    //     setLoginErrorValid("");
    //     setLoginFormError({user_email: "", user_password: "", });
    //
    //     setRegisterFormData({user_name: "", user_email: "", user_password: "",});
    //     setRegisterFormError({user_name: "", user_email: "", user_password: "", });
    //     setRegisterErrorValid("");
    // }, [activeForm]);

    const submitLoginForm = async (event)=>{
        event.preventDefault();
        login(loginFormData);
    };

    return (
        <div className={`mx-2 container ${style.myContainer} bg-dark`}>
            <div className="row h-100 px-4">
                <div className="rounded-4 bg-warning h-100 col-md-5 col-lg-6 col d-lg-flex d-none flex-column position-relative">
                    <div className="header-form-message d-flex p-1 w-100 justify-content-between ">
                        <div className="brand-logo fw-bold">
                            <span className="text-secondary fs-2 fas fa-bowl-food"></span>
                            <span className="text-secondary fs-3"> Food </span>
                            <span className="text-dark fs-3"> Blog</span>
                        </div>
                        <button className="btn btn-secondary bg-opacity-50 text-white rounded-5" onClick={()=>navigate("/")}> Bact to website <span
                            className="fas fa-arrow-circle-right"></span></button>
                    </div>

                    {/* my carousel */}

                    <div className="flex-grow-1">
                        <Swiper
                            modules={[Pagination, Autoplay, Navigation]}
                            slidesPerView={1}
                            pagination={{clickable: true}}
                            speed={10000}
                            navigation
                            autoplay={{delay: 0, disableOnInteraction: false}}
                            loop={true}
                            className={style.mySwiper}
                        >
                            <SwiperSlide className={style.slide}>
                                <img src={image18} alt={"carousel-image"} />
                            </SwiperSlide>
                            <SwiperSlide className={style.slide}>
                                <img src={image17} alt={"carousel-image"} />
                            </SwiperSlide>
                            <SwiperSlide className={style.slide}>
                                <img src={image19} alt={"carousel-image"} />
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>

                <div className={`${style.formContainer} col h-100 col-sm-12 col-md-12 col-lg-6`}>

                    <div id="register-form" className={`h-100 w-100 ${activeForm ? style.active : ""} ${style.form}`}>
                        <h1 className="text-center fs-1 fw-bold text-white"> Create an account </h1>
                        <p className="text-secondary"> I already have an Account
                            <a href="#" id="login-bt" onClick={displayLoginForm} className="text-decoration-none fw-bold text-warning"> Login </a>
                        </p>

                        <form method="post" action="#">
                            <input className={`form-control bg-secondary`} type="text" name="user_name" placeholder="Name"
                                   value={registerFormData.user_name} onChange={changeRegisterValues}/><br/>
                            <input className="form-control bg-secondary" type="email" name="user_email" placeholder="Email"
                                   value={registerFormData.user_email} onChange={changeRegisterValues}/><br/>
                            <div className="input-group">
                                <input className="form-control bg-secondary" type={`${!viewPasswordLogin ? "password" : "text"}`} name="user_password"
                                       placeholder="Password" value={registerFormData.user_password} onChange={changeRegisterValues}/><br/>
                                <button type="button" onClick={toogleViewPassword} className="fas btn bg-secondary"><span className={`fas ${!viewPasswordLogin ? "fa-eye" : "fa-eye-slash"}`}></span></button>
                            </div>
                            <br/>

                            <button className="btn fw-bold btn-warning btn-block w-100" type="submit">Register</button>
                        </form>
                        <br/>

                        <div className={`${style.anotherLink}`}>
                            <p> or register with </p>
                            <div className="line"></div>
                        </div>
                        <br/>

                        <div className="social-link d-flex justify-content-center gap-5 gap-sm-5 justify-content-sm-center justify-content-md-between align-items-center">
                            <div><a href="#" className="btn btn-secondary bg-transparent"> <span
                                className="fab fa-google"></span> <span className="d-none d-sm-inline-block">Google </span></a>

                            </div>
                            <div><a href="#" className="btn btn-secondary bg-transparent"> <span
                                className="fab fa-github"></span> <span className="d-none d-sm-inline-block">Github</span> </a>

                            </div>
                            <div><a href="#" className="btn btn-secondary bg-transparent"> <span
                                className="fab fa-facebook"></span> <span className="d-none d-sm-inline-block">Facebook</span></a>

                            </div>
                        </div>

                    </div>

                    <div id="login-form" className={`${!activeForm ? style.active : ""} ${style.form} h-100 w-100`}>

                        <h1 className="text-center fs-1 fw-bold text-white"> Login </h1>
                        <p className="text-secondary">
                            I don't have an Account
                            <a href="#" id="register-bt" onClick={displayRegisterForm} className="text-decoration-none fw-bold text-warning"> Register </a>
                        </p>

                        <form onSubmit={submitLoginForm}>
                            {loginErrorValid != "" ? <div className="text-danger fw-bold text-decoration-underline rounded-3 fs-5 text-center"> {loginErrorValid} </div> : ""} <br/>
                            <input className={`form-control ${loginFormError.user_email != "" ? "bg-danger text-white" : "bg-secondary"}`} type="text" name="user_email" placeholder="Email"
                                   value={loginFormData.user_email} onChange={changeLoginValues}/>
                            {loginFormError.user_email != "" ? <p className="text-danger"><span className="fas fa-warning"> </span> {loginFormError.user_email}</p>: ""}
                            <br/>

                            <div className={`input-group`}>
                                <input className={`form-control ${loginFormError.user_password != "" ? "bg-danger text-white" : "bg-secondary"}`} type={`${!viewPasswordLogin ? "password" : "text"}`} name="user_password"
                                       placeholder="Password" value={loginFormData.user_password} onChange={changeLoginValues}/><br/>
                                <button type={"button"} onClick={toogleViewPassword} className={` btn ${loginFormError.user_password != "" ? "bg-danger text-white" : "bg-secondary"}`}> <span className={`fas ${viewPasswordLogin ? "fa-eye": "fa-eye-slash"}`}> </span></button>
                            </div>
                            {loginFormError.user_password != "" ? <p className="text-danger"><span className="fas fa-warning"> </span> {loginFormError.user_password}</p>: ""}
                            <br/>

                            <button className="btn fw-bold btn-warning btn-block w-100" type="submit">Login</button>
                        </form>
                        <br/>

                        <div className={`${style.anotherLink}`}>
                            <p> or register with </p>
                            <div className="line"></div>
                        </div>
                        <br/>

                        <div className="social-link d-flex justify-content-center gap-5 gap-sm-5 justify-content-sm-center justify-content-md-between align-items-center">
                            <div><a href="#" className="btn btn-secondary bg-transparent"> <span
                                className="fab fa-google"></span> <span className="d-none d-sm-inline-block">Google </span></a>

                            </div>
                            <div><a href="#" className="btn btn-secondary bg-transparent"> <span
                                className="fab fa-github"></span> <span className="d-none d-sm-inline-block">Github</span> </a>

                            </div>
                            <div><a href="#" className="btn btn-secondary bg-transparent"> <span
                                className="fab fa-facebook"></span> <span className="d-none d-sm-inline-block">Facebook</span></a>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    );
};

export default Form;