
import {useParams} from "react-router-dom";
import axios from "axios";
import {useAuthContext} from "../../context/authContext";
import {Alert, Modal} from "react-bootstrap";

export default function UserPage(){
    const {userId} = useParams();
    console.log(userId);
    const {token, user} = useAuthContext();
    console.log("l'utilisateur connecte est : ", user);
    return (
        <div className="h-100 w-100 d-flex align-items-center justify-content-center">
            user page for {user.user_name}
        </div>
    )
}