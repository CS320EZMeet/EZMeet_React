import React from "react";
import Card from "react-bootstrap/Card";
import { Row, Col } from "react-bootstrap";
import Togepi from "../../assets/Togepi.jpeg";
import Anon from "../../assets/anon_pfp.png"
import './card.css'

const GroupCard = ({ user_id }: { user_id: String }) => {
  return (
    <Card className="groupCard">
      <Row>
        <Col md={2} lg={2} className="my-auto mx-auto">
          <Card.Img style={{height:"100%"}}variant="top" src={Togepi} />
        </Col>
        <Col className="my-auto mx-auto text-center">
          <Card.Text>{user_id}</Card.Text>
        </Col>
      </Row>
    </Card>
  );
};

const AddCard = () => {
  return(
  <div onClick={()=> alert("finding midpoint")}>
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

export {GroupCard, AddCard};
