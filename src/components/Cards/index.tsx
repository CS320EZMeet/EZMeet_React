import React from "react";
import Card from "react-bootstrap/Card";
import { Row, Col } from "react-bootstrap";
import Anon from "../../assets/anon_pfp.png"
import './card.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPerson, faLocation } from "@fortawesome/free-solid-svg-icons";

const GroupCard = ({ user_id, color }: { user_id: String, color: string }) => {
  return (
    <Card className="groupCard">
      <Row>
        <Col md={2} lg={2} className="my-auto mx-auto">
          <FontAwesomeIcon icon={faPerson} size="lg" color={color} />
        </Col>
        <Col className="my-auto mx-auto text-center">
          <Card.Text>{user_id}</Card.Text>
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

const PlaceCard = ({ color }: { color: string}) => {
  return(<div>
    <Card className="groupCard">
        <Row>
          <Col md={2} lg={2} className="my-auto mx-auto">
            <FontAwesomeIcon icon={faLocation} size="lg" color={color} />
          </Col>
          <Col className="my-auto mx-auto text-center">
            <Card.Text>Papa Pizzeria</Card.Text>
            <div style={{fontSize: "2vh"}}>5.0/5.0</div>
          </Col>
        </Row>
      </Card>
  </div>)
}




export {GroupCard, AddCard, PlaceCard};
