import "./navbar.css";
import {NavLink, Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {Button, Offcanvas, Container, Image, Dropdown} from "react-bootstrap";
import {useAuthContext} from "../../context/authContext";
import image from "../../assets/images/image19.png";
import axios from "axios";

const NavBar = function(){
    const [show, setShow] = useState(false);
    const [enter, setEnter] = useState(false);
    const {isAuth, user, logout, checkIfWasUserLoggedIn} = useAuthContext();


    const handleShow=()=>{setShow(true);}
    const handleClose=()=>{setShow(false);}

    useEffect(()=>{
        checkIfWasUserLoggedIn();
    }, []);

    return (

        <nav>
            <Container className="py-2 d-flex justify-content-between align-items-center">
                <Link to={"/"} className="fw-bold fs-3 text-light text-decoration-none">
                    <span className="fas fa-bowl-food text-warning"></span>
                    <span className="text-warning"> Food </span>
                    <span> Blog </span>
                </Link>

                <Button className={`btn-sm btn-outline-light ${enter ? "bg-light text-dark" : "bg-transparent text-light"} d-md-none`}
                        onMouseEnter={()=>{setEnter(true);}} onMouseLeave={()=>{setEnter(false);}} onClick={handleShow}>
                    <span className="fas fa-navicon"></span>
                </Button>

                {/*my navlink */}
                <ul className="list-unstyled nav-links d-none d-md-flex align-items-center gap-4">
                    <li className="link"> <NavLink to={"/"}> Home </NavLink></li>
                    <li className="link"> <NavLink to={"/article"}> Article </NavLink></li>
                    <li className="link"> <NavLink to={"/chat"}> Chat </NavLink></li>
                    {isAuth ? <li className="link"> <NavLink to={"/dashboard"}> Dashboard </NavLink></li> : ""}
                    <li>
                        {isAuth ? (
                            <>
                                <Dropdown>
                                    <Dropdown.Toggle className="bg-transparent border-0"><span className="fas fa-user-circle fs-4"></span></Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item className="text-center fw-bold fs-6"> {user.user_name.toUpperCase()} </Dropdown.Item>
                                        <Link to={`/users/get-user/${user._id}`} className="dropdown-item"> <Button variant="primary"> More informations </Button></Link>
                                        <Dropdown.Item> <Button className="w-100" variant="danger" onClick={logout}> Logout </Button> </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                                {/*<Link to={"/user"} className="d-flex align-items-center fw-bold mx-2 gap-2 text-decoration-none text-light">*/}
                                {/*    <span>{user.user_name}</span>*/}
                                {/*</Link>*/}
                            </>
                        ) : (
                            <Link to={"/login"} className={`btn btn-outline-light ${enter ? "bg-light text-dark" : "bg-transparent text-light"} rounded-5 fw-bold px-4`} onMouseEnter={()=>{setEnter(true);}} onMouseLeave={()=>{setEnter(false);}} >
                                Login
                            </Link>
                        )}
                    </li>
                </ul>

                {/* Mobile Navlink */}
                <Offcanvas onHide={handleClose} placement="end" className="bg-dark text-light" show={show}>
                    <Offcanvas.Header className="d-flex justify-content-end">
                        <Button onClick={handleClose} onMouseEnter={()=>{setEnter(true);}} onMouseLeave={()=>{setEnter(false);}} className={`${!enter ? "bg-light text-dark" : "bg-transparent text-light"} btn-outline-light btn-sm`}> <span className="fas fa-close"></span></Button>
                    </Offcanvas.Header>

                    <Offcanvas.Body>
                        <ul id="my-mobile-link" className="d-flex list-unstyled gap-4 text-center flex-column align-items-center">
                            <li className="w-100"> <NavLink to={"/"} className="text-decoration-none fs-5"> Home </NavLink> </li>
                            <li className="w-100"> <NavLink to={"/article"} className="text-decoration-none fs-5"> Article </NavLink> </li>
                            <li className="w-100"> <NavLink to={"/chat"} className="text-decoration-none fs-5"> Chat </NavLink> </li>
                            {isAuth ? (
                                <li className="w-100"> <NavLink to={"/dashboard"} className="text-decoration-none fs-5"> Dashboard </NavLink></li>
                            ) : ""}

                            <li className={`${isAuth ? "bg-secondary" : ""} rounded p-2 d-flex justify-content-around w-100 align-items-center`}>
                                {isAuth ? (
                                    <>
                                        <Image src={image} width={100} height={100} rounded={true} alt={"user image"} fluid={true} className="p-2 border border-2"/>
                                        <div>
                                            <span className="fw-bold">{user.user_name} </span> <br/><br />
                                            <Button> More Informations </Button>
                                        </div>
                                    </>
                                ) : (
                                    <Link to={"/login"} className={`btn btn-outline-light ${enter ? "bg-light text-dark" : "bg-transparent text-light"} rounded-5 fw-bold px-4`} onMouseEnter={()=>{setEnter(true);}} onMouseLeave={()=>{setEnter(false);}} >
                                        Login
                                    </Link>
                                )}

                            </li>
                        </ul>
                    </Offcanvas.Body>
                </Offcanvas>
            </Container>
        </nav>
    )
};

export default NavBar;