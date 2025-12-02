import image from "../../assets/images/image19.png";
import style from "./userBadge.module.css";

const UserBadge = ({user_name})=>{
    return (
        <div className={style.mainContainer}>
            <span className="fs-6 fw-bold"> {user_name} </span>
            <div>
                {/*<img src={image} alt={"image of user badge"} width={"auto"} height={"30"}/>*/}
                <span className="fas fa-user"></span>
            </div>
        </div>
    )
};
export default UserBadge;