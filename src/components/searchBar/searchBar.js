import {Button, Dropdown} from "react-bootstrap";
import style from "./searchBar.module.css";

const SearchBar = ()=>{
    return (
        <form className={`p-2 w-100 ${style.searchBar}`}>
            <button className="rounded-circle p-1 btn d-flex align-items-center justify-content-center"> <span className="fas fa-search"></span></button>
            <input type={"text"} placeholder={"Search ..."}/>
            <select className="form-select bg-dark text-white">
                <option> select filter </option>
                <option value={"name"}> Name </option>
                <option value={"author"}> Author </option>
                <option value={"category"}> Category </option>
            </select>
        </form>
    )
};

export default SearchBar;