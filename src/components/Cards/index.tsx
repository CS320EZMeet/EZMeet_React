import React from "react";
import Card from "react-bootstrap/Card";
import { Row, Col } from "react-bootstrap";
import Anon from "../../assets/anon_pfp.png"
import './card.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPerson, faFlag } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";


const removeUser = async (user: string, group_id: string) => {
  let url;
  url = "https://ezmeet2022.herokuapp.com/"
  const res = await axios.post(url+"group/leave/" + group_id + "/", {userName: user})
}

const GroupCard = ({ user_id, color, group_id }: { user_id: string, color: string, group_id: string }) => {
  return (
    <Card className="groupCard">
      <Row>
        <Col md={2} lg={2} className="my-auto mx-auto">
          <FontAwesomeIcon icon={faPerson} size="lg" color={color} />
        </Col>
        <Col md={8} lg={8} className="mx-auto text-center">
          <Card.Text>{user_id}</Card.Text>
        </Col>
        <Col className="text-end remove">
          <h2 onClick={()=>{
            removeUser(user_id,group_id)
            window.location.reload()
          }}>X</h2>
        </Col>
      </Row>
    </Card>
  );
};

const AddCard = ({ groupId }: { groupId: number}) => {
  return(
  <div>
    <Card className="groupCard addCard">
        <Row>
          <Col md={2} lg={2} className="my-auto mx-auto">
            <Card.Img style={{height:"100%"}}variant="top" src={Anon} />
          </Col>
          <Col className="my-auto mx-auto text-center">
            <Card.Text>Add member +</Card.Text>
          </Col>
        </Row>
      </Card>
  </div>
  )
}

const PlaceCard = ( {color, name, address} : {color: string, name: string, address: string}) => {
  let link = "https://www.google.com/maps/dir/?api=1&query=" + encodeURI(address)
  return(<div>
    <Card className="placeCard">
        <Row>
          <Col md={2} lg={2} className="my-auto mx-auto">
            <FontAwesomeIcon icon={faFlag} size="lg" color={color} />
          </Col>
          <Col md={8} lg={8} className="my-auto mx-auto text-center">
            <Card.Text>{name}</Card.Text>
          </Col>
          <Col className="my-auto text-end rating">
            <div style={{fontSize: "2vh"}}>
              <a href={link}>Directions</a>
            </div>
          </Col>
        </Row>
      </Card>
  </div>)
}




export {GroupCard, AddCard, PlaceCard};
