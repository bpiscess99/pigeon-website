import { Progress, Tag } from "antd";
import React, { useContext } from "react";
import { Card, Image } from "react-bootstrap";
import "../index.css";
import TournamentContext from "./Contexts/TournamentContext";
import PigeonContext from "./Contexts/PigeonContext";

const AdminDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { tournaments } = useContext(TournamentContext);
  const { owners } = useContext(PigeonContext);
  console.log(owners);

  return (
    <div className="d-flex ">
      <div>
        <Card style={{ width: "13rem", height: "90vh" }}>
          <Card.Body>
            <Image src="/clubs.png" alt="club_img" />
            <Card.Title className="color-orange text-capitalize">
              {user.name}
            </Card.Title>
            <Card.Text>
              <Tag color="orange">{user.email}</Tag>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
      <div className="d-flex gap-2 p-2">
        {owners &&
          ["Tournaments", "Pigeon Owners"].map((_, index) => {
            return (
              <Card style={{ width: "18rem", height: "10rem" }}>
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <Card.Subtitle style={{ color: "#ffa76e" }}>
                    {_}
                  </Card.Subtitle>
                  {index === 0 ? (
                    <Image
                      src="/tournament.png"
                      alt="club_img"
                      width={"30px"}
                    />
                  ) : (
                    <Image src="/pigeon.png" alt="club_img" width={"30px"} />
                  )}
                </Card.Header>
                <Card.Body className="d-flex justify-content-between align-items-center">
                  <Card.Subtitle className="mb-2 display-3 text-secondary">
                    {index === 0 ? tournaments.length : owners.length}
                  </Card.Subtitle>
                  <Progress
                    type="circle"
                    percent={
                      index === 0
                        ? (tournaments.length * 990) / 100
                        : (owners.length * 90) / 100
                    }
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

export default AdminDashboard;
