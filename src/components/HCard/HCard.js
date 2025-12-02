import style from "./HCard.module.css";
import {NavLink} from "react-router-dom";

const HCard = ({article_id, article_image, article_title, article_category, article_author, article_date_creation})=>{
    const listColor = ["bg-success", "bg-warning", "bg-danger", "bg-dark"];
    console.log();
    return (
        <NavLink to={`/article/show/${article_id}`} className={style.mainBlock}>
            <div className={style.firstBlock}>
                <img src={article_image} alt={"horizontal card image"}/>
            </div>

            <div className={style.secondBlock}>
                <h2> {article_title} </h2>

                <div className={style.articleInfo}>
                    <h5 className="bg-warning"> {article_category} </h5>
                    <p className="bg-primary px-2 py-1 rounded-4 fw-bold fs-6"> By <strong> {article_author} </strong></p>
                </div>
                <strong> Create and Share the : {article_date_creation} </strong>
            </div>
        </NavLink>
    )
};

export default HCard;