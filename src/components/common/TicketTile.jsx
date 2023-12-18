import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function TicketTile({ ticket }) {
  const [showFullText, setShowFullText] = useState(false);

  const toggleTextVisibility = () => {
    setShowFullText(!showFullText);
  };

  return (
    <Card style={{ width: "100%", marginBottom: "20px" }}>
      <Card.Img
        variant="top"
        src={ticket.imageUrl}
        style={{ height: "300px", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title>{ticket.title}</Card.Title>
        <Card.Text>
          {ticket && ticket.description
            ? showFullText
              ? ticket.description
              : `${ticket.description.slice(0, 100)}...`
            : ""}
        </Card.Text>
        <Button variant="primary" onClick={toggleTextVisibility}>
          {showFullText ? "Show Less" : "Learn More"}
        </Button>
      </Card.Body>
    </Card>
  );
}

export default TicketTile;
