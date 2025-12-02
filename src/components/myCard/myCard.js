import "./myCard.css";
import {Card, Figure} from "react-bootstrap";
import image from "../../assets/images/image19.png";

const MyCard = ()=>{
    return (
        <div className="card-container">
            <Card>
                <Card.Img src={image} variant="bottom"/>
                <Card.Body>
                    Body of the card
                </Card.Body>
            </Card>
        </div>
    )
};

export default MyCard;