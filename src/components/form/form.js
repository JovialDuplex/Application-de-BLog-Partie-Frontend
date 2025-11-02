import style from "./form.module.css";
import image17 from "../../assets/images/image17.png";
import image18 from "../../assets/images/image18.png";
import image19 from "../../assets/images/image19.png";
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Autoplay, Pagination} from "swiper/modules";
import "swiper/swiper.css";
import {useEffect, useState} from "react";

const Form = function(){
    const [activeForm, setActiveForm] = useState(true);
    const [viewPasswordLogin, setViewPasswordLogin] = useState(false);
    const [loginFormData, setLoginFormData] = useState({
        user_email: "",
        user_password: ""
    });

    const displayLoginForm = ()=>setActiveForm(false);
    const displayRegisterForm = ()=>setActiveForm(true);
    const toogleViewPassword = ()=>{setViewPasswordLogin(!viewPasswordLogin);}


    return (
        <div className={`mx-2 container ${style.myContainer} bg-dark`}>
            <div className="row h-100 px-4">
                <div
                    className="rounded-4 bg-warning h-100 col-md-5 col-lg-6 col d-lg-flex d-none flex-column position-relative">
                    <div className="header-form-message d-flex p-1 w-100 justify-content-between ">
                        <div className="brand-logo fw-bold">
                            <span className="text-secondary fs-2 fas fa-bowl-food"></span>
                            <span className="text-secondary fs-3"> Food </span>
                            <span className="text-dark fs-3"> Blog</span>
                        </div>
                        <button className="btn btn-secondary bg-opacity-50 text-white rounded-5"> Bact to website <span
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
                            <input className="form-control bg-secondary" type="text" name="user_name" placeholder="Name"
                                   required /><br/>
                            <input className="form-control bg-secondary" type="email" name="user_email" placeholder="Email"
                                   required /><br/>
                            <div className="input-group">
                                <input className="form-control bg-secondary" type={`${!viewPasswordLogin ? "password" : "text"}`} name="user_password"
                                       placeholder="Password" required/><br/>
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

                        <div className="social-link d-flex justify-content-between align-items-center">
                            <div><a href="#" className="btn btn-secondary bg-transparent"> <span
                                className="fab fa-google"></span> Google </a>

                            </div>
                            <div><a href="#" className="btn btn-secondary bg-transparent"> <span
                                className="fab fa-github"></span> Github </a>

                            </div>
                            <div><a href="#" className="btn btn-secondary bg-transparent"> <span
                                className="fab fa-facebook"></span> Facebook </a>

                            </div>
                        </div>

                    </div>

                    <div id="login-form" className={`${!activeForm ? style.active : ""} ${style.form} h-100 w-100`}>
                        <h1 className="text-center fs-1 fw-bold text-white"> Login </h1>
                        <p className="text-secondary">
                            I don't have an Account
                            <a href="#" id="register-bt" onClick={displayRegisterForm} className="text-decoration-none fw-bold text-warning"> Register </a>
                        </p>

                        <form method="post" action="#">
                            <input className="form-control bg-secondary" type="email" name="user_email" placeholder="Email"
                                   required/><br/>
                            <div className="input-group">
                                <input className="form-control bg-secondary" type={`${!viewPasswordLogin ? "password" : "text"}`} name="user_password"
                                       placeholder="Password" required/><br/>
                                <button type={"button"} onClick={toogleViewPassword} className={` btn bg-secondary`}> <span className={`fas ${!viewPasswordLogin ? "fa-eye": "fa-eye-slash"}`}> </span></button>
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

                        <div className="social-link d-flex justify-content-between align-items-center">
                            <div><a href="#" className="btn btn-secondary bg-transparent"> <span
                                className="fab fa-google"></span> Google </a>

                            </div>
                            <div><a href="#" className="btn btn-secondary bg-transparent"> <span
                                className="fab fa-github"></span> Github </a>

                            </div>
                            <div><a href="#" className="btn btn-secondary bg-transparent"> <span
                                className="fab fa-facebook"></span> Facebook </a>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>

    );
};

export default Form;