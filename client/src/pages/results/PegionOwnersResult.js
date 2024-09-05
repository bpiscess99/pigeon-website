import { Tag } from "antd";
import React from "react";
import { Card, Col, Container, Image, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const PegionOwnersResult = () => {
  const { owner } = useLocation().state;
  console.log(owner);

  return (
    <Container>
      <Row className="align-items-center">
        {/* Left Side - Image */}
        <Col md={5} className="text-center">
          <Image
            src={owner.image || "/default-image.png"}
            alt={owner.name}
            fluid
            className="shadow-lg rounded"
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
        </Col>
        {/* Right Side - Details */}
        <Col md={7}>
          <Card className="shadow-sm p-4">
            <Card.Body>
              <Card.Title className="display-6">{owner.name}</Card.Title>
              <Card.Subtitle className="text-muted mb-3">
                {owner.city}
              </Card.Subtitle>
              <hr />
              {/* Pigeon Results */}
              <h5 className="mb-3">Pigeon Results</h5>
              <ul className="list-unstyled ">
                <li>
                  Total Pigeons:{" "}
                  <Tag color="red">
                    {owner.pigeonsResults.totalPigeons || "N/A"}
                  </Tag>
                </li>

                <li>
                  First Pigeon Return Time:{" "}
                  <Tag color="blue">
                    {owner.pigeonsResults.firstPigeonReturnTime || (
                      <Tag color="orange">N/A</Tag>
                    )}
                  </Tag>
                </li>
                <li>
                  Second Pigeon Return Time:{" "}
                  <Tag color="blue">
                    {owner.pigeonsResults.secondPigeonReturnTime || (
                      <Tag color="orange">N/A</Tag>
                    )}
                  </Tag>
                </li>
                <li>
                  Third Pigeon Return Time:{" "}
                  <Tag color="blue">
                    {owner.pigeonsResults.thirdPigeonReturnTime || (
                      <Tag color="orange">N/A</Tag>
                    )}
                  </Tag>
                </li>
                <li>
                  Fourth Pigeon Return Time:{" "}
                  <Tag color="blue">
                    {owner.pigeonsResults.fourthPigeonReturnTime || (
                      <Tag color="orange">N/A</Tag>
                    )}
                  </Tag>
                </li>
                <li>
                  Fifth Pigeon Return Time:{" "}
                  <Tag color="blue">
                    {owner.pigeonsResults.fifthPigeonReturnTime || (
                      <Tag color="orange">N/A</Tag>
                    )}
                  </Tag>
                </li>
                <li>
                  Sixth Pigeon Return Time:{" "}
                  <Tag color="blue">
                    {owner.pigeonsResults.sixthPigeonReturnTime || (
                      <Tag color="orange">N/A</Tag>
                    )}
                  </Tag>
                </li>
                <li>
                  Seventh Pigeon Return Time:{" "}
                  <Tag color="blue">
                    {owner.pigeonsResults.seventhPigeonReturnTime || (
                      <Tag color="orange">N/A</Tag>
                    )}
                  </Tag>
                </li>
                <li>
                  <strong>Total Time:</strong>{" "}
                  <Tag color="red">
                    {owner.pigeonsResults.total || (
                      <Tag color="yellow">N/A</Tag>
                    )}
                  </Tag>
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PegionOwnersResult;
