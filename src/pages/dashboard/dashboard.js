import "./dashboard.css";
import {Link} from "react-router-dom";
import SearchBar from "../../components/searchBar/searchBar";
import MyCard from "../../components/myCard/myCard";

export const DashBoardHomePage = ()=>{
    
    return (
        <div className="h-100 w-100 gap-2 main-container">
            <ul className="sidenav h-100 d-flex list-unstyled flex-column align-items-center justify-content-evenly bg-secondary rounded-3">
                <li> <Link to={"/dashboard"}> <span className="fas fa-home"></span> <span> Home</span> </Link></li>
                <li> <Link to={"/dashboard/articles"}><span className="fas fa-clipboard-list"></span><span> Articles</span></Link></li>
                <li> <Link to={"/dashboard/categories"}> <span className="fas fa-th-list"></span><span> Categories</span></Link></li>
                <li> <Link to={"/dashboard/user-info"}> <span className="fas fa-user"></span><span> MySelf</span> </Link></li>
            </ul>
            <div className="main-part rounded-3 p-2" style={{background: "var(--bs-gray-800)"}}>
                <header style={{display: "grid", gridTemplateColumns: "3fr 2fr"}}>
                    <h2> </h2>
                    <SearchBar/>
                </header>
                <div className="articles-list-container pt-3">

                    {/*<ul className="row article-list list-unstyled">*/}
                    {/*    {Array.from({length: 20}).map((value, index)=>(*/}
                    {/*        <li className="col-auto" key={index}> <MyCard /></li>*/}
                    {/*    ))}*/}
                    {/*</ul>*/}
                </div>
            </div>
        </div>
    )
};

