import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Container, Image, ListGroup, Row } from "react-bootstrap";
const LandingClubs = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [tournaments, setTournaments] = useState([]);
  const fetchClubTournaments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/tournaments/club/:66d04d02d7fe088789cd9db9`
      );
      if (response.data.success) {
        setTournaments(response.data.clubTournaments);
      }
    } catch (error) {
      console.error("Error fetching clubs:", error);
    }
  };
  useEffect(() => {
    fetchClubTournaments();
  }, []);

  console.log(tournaments);

  return (
    <div>
      <Container className="my-5">
        {tournaments.map((tournament, index) => {
          return (
            <Row className="align-items-center">
              {/* Left Side - Image */}
              <Col md={5} className="text-center">
                <Image
                  src={tournament.image}
                  alt={tournament.tournamentName}
                  fluid
                  className="shadow-lg rounded"
                  style={{ maxHeight: "400px", objectFit: "cover" }}
                />
              </Col>

              {/* Right Side - Tournament Details */}
              <Col md={7}>
                <Card className="shadow-sm p-3">
                  <Card.Body>
                    <Card.Title className="display-6">
                      {tournament.tournamentName}
                    </Card.Title>
                    <Card.Subtitle className="text-muted mb-3">
                      {tournament.type}
                    </Card.Subtitle>
                    <Card.Text className="mb-3">
                      {tournament.tournamentInformation}
                    </Card.Text>

                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <strong>Category:</strong> {tournament.category}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Status:</strong>{" "}
                        {tournament.status_.toUpperCase()}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Number of Pigeons:</strong>{" "}
                        {tournament.numberOfPigeons}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Number of Prizes:</strong>{" "}
                        {tournament.numberOfPrizes}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Helper Pigeons:</strong>{" "}
                        {tournament.helperPigeons}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Number of Days:</strong>{" "}
                        {tournament.numberOfDays}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Continue Days:</strong>{" "}
                        {tournament.continueDays}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Start Date:</strong>{" "}
                        {new Date(tournament.startDate).toLocaleDateString()}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Start Time:</strong> {tournament.startTime}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>Note Time for Pigeons:</strong>{" "}
                        {tournament.noteTimeForPigeons}
                      </ListGroup.Item>

                      <hr />

                      {/* Prizes */}
                      <h5 className="mb-3">Prizes</h5>
                      <ListGroup.Item>
                        <strong>1st Prize:</strong> ${tournament.prize1}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>2nd Prize:</strong> ${tournament.prize2}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>3rd Prize:</strong> ${tournament.prize3}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>4th Prize:</strong> ${tournament.prize4}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        <strong>5th Prize:</strong> ${tournament.prize5}
                      </ListGroup.Item>
                    </ListGroup>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          );
        })}
      </Container>
    </div>
  );
};

export default LandingClubs;
