import React from "react";
import Card from "react-bootstrap/Card";
import { Row, Col } from "react-bootstrap";
import Togepi from "../../assets/Togepi.jpeg";
import './card.css'

const GroupCard = ({ user_id }: { user_id: String }) => {
  return (
    <Card className="groupCard">
      <Row>
        <Col md={5} lg={5} className="my-auto mx-auto">
          <Card.Img variant="top" src={Togepi} />
        </Col>
        <Col className="my-auto mx-auto text-center">
          <Card.Text>{user_id}</Card.Text>
          {/* <Button variant="primary">Go somewhere</Button> */}
        </Col>
      </Row>
    </Card>
  );
};

const BaseCard = () => {
  return <div>HELLO</div>;
};

export default GroupCard;
