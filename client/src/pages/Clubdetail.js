import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button, Container, Form, Image } from "react-bootstrap";
import { Avatar, Card } from "antd";

const Clubdetail = () => {
  const { slug } = useParams();
  const [club, setClub] = useState({});
  const [formData, setFormData] = useState({
    tournamentName: "",
    cname: "",
    startDate: "",
    image: "",
  });
  const [isRequest, setIsRequest] = useState(false);

  const fetchClubDetails = async () => {
    try {
      const response = await axios.get(`/api/v1/auth/clubs/${slug}`);
      setClub(response.data.club);
      console.log(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevTournament) => {
      return {
        ...prevTournament,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    fetchClubDetails();
  }, []);
  if (club.length === 0) {
    return <>loading</>;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Container className="py-2 d-flex justify-content-between align-items-start">
      <div>
        <h4 className="py-2 px-1">
          Welcome to <span className="badge text-bg-info">{club.cname}</span>
        </h4>
        <Card
          size="lg"
          key={club._id}
          style={{
            width: 370,
          }}
        >
          <Card.Meta
            avatar={<Avatar src="/clubs.png" alt="club_image" />}
            title={
              <h4> {`${club.cname && club.cname.toUpperCase()} -CLUB`}</h4>
            }
            description={
              <div className="gap-3 d-flex flex-column">
                <h4>
                  <span className="badge text-bg-info"> {club.name}</span>
                </h4>
                <h6 className="d-flex align-items-center gap-3 justify-content-start">
                  <Image src="/gmail.png" width={"25px"} />
                  <strong>{club.email}</strong>{" "}
                </h6>
              </div>
            }
          />
        </Card>
      </div>
      <div className="py-2">
        {!isRequest && (
          <Button
            variant="outline-info"
            onClick={() => setIsRequest(true)}
            size="sm"
          >
            Tournament Request
          </Button>
        )}
        {isRequest && (
          <div className="py-2">
            <Form onSubmit={handleSubmit}>
              <Form.Group
                className="mb-1"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Tournament Name</Form.Label>
                <span className="star">*</span>
                <Form.Control
                  type="text"
                  required
                  name="tournamentName"
                  value={formData.tournamentName}
                  placeholder="Tournament Name"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group
                className="mb-1"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Club Name</Form.Label>
                <span className="star">*</span>
                <Form.Control
                  type="text"
                  required
                  name="cname"
                  value={formData.cname}
                  placeholder="Club Name"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group
                className="mb-1"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Start Date</Form.Label>
                <span className="star">*</span>
                <Form.Control
                  type="date"
                  required
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                />
              </Form.Group>
              {/* <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>End Date</Form.Label>
              <Form.Control 
              type="date" 
              required
              name="endDate" 
              value={endDate} 
              onChange={handleInputChange} />
            </Form.Group> */}
              <Form.Group controlId="formFile" className="mb-1">
                <Form.Label>Upload Image</Form.Label>
                <Form.Control
                  type="file"
                  name="image"
                  onChange={handleChange}
                />
              </Form.Group>
              <Button as="input" type="submit" value="submit" />{" "}
            </Form>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Clubdetail;
