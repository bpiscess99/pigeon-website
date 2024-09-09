import { Progress, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { Card, Image } from "react-bootstrap";
import "../../index.css";
import axios from "axios";
import { NavLink } from "react-router-dom";

const ClubOwnerDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);

  const [tournaments, setTournaments] = useState([]);
  const fetchClubTournaments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/tournaments/club/:${user.id}`
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

  return (
    <div className="d-flex ">
      <div>
        <Card style={{ width: "13rem", height: "90vh" }}>
          <Card.Body>
            <Image src="/clubs.png" alt="club_img" />
            <Card.Title className="color-orange text-capitalize">
              {user.name} Dashboard
            </Card.Title>
            <Card.Text>{user.email}</Card.Text>
            <hr />
          </Card.Body>
        </Card>
      </div>
      <div className="d-flex gap-2 p-2">
        {["Tournaments", "Pigeon Owners"].map((_, index) => {
          return (
            <Card style={{ width: "18rem", height: "10rem" }}>
              <Card.Header className="d-flex justify-content-between align-items-center">
                <Card.Subtitle style={{ color: "black" }}>
                  {index === 0 ? (
                    <NavLink
                      style={({ isActive }) => {
                        return {
                          color: isActive ? "blue" : "black",
                        };
                      }}
                      className={"text-decoration-none"}
                      to={`/club/:${user.slug}/tournaments`}
                    >
                      {" "}
                      {_}
                    </NavLink>
                  ) : (
                    <NavLink
                      style={({ isActive }) => {
                        return {
                          color: isActive ? "blue" : "black",
                        };
                      }}
                      className={"text-decoration-none"}
                      to={`/club/:${user.slug}/pigeonOwners`}
                    >
                      {" "}
                      {_}
                    </NavLink>
                  )}
                </Card.Subtitle>
                {index === 0 ? (
                  <Image src="/tournament.png" alt="club_img" width={"30px"} />
                ) : (
                  <Image src="/pigeon.png" alt="club_img" width={"30px"} />
                )}
              </Card.Header>
              <Card.Body className="d-flex justify-content-between align-items-center">
                <Card.Subtitle className="mb-2 display-3 text-secondary">
                  {tournaments.length}
                </Card.Subtitle>
                <Progress
                  type="circle"
                  percent={tournaments.length * 990}
                  size={"small"}
                />
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default ClubOwnerDashboard;
