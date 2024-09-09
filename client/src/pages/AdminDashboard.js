import { Progress, Tag } from "antd";
import React, { useContext } from "react";
import { Card, Image } from "react-bootstrap";
import "../index.css";
import TournamentContext from "./Contexts/TournamentContext";
import PigeonContext from "./Contexts/PigeonContext";
import BannerContext from "./Contexts/BannerContext";

const AdminDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { tournaments } = useContext(TournamentContext);
  const { owners } = useContext(PigeonContext);
  const { banners } = useContext(BannerContext);

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
        {owners &&
          ["Tournaments", "Pigeon Owners", "Banners"].map((_, index) => {
            return (
              <>
                <Card style={{ width: "18rem", height: "10rem" }}>
                  <Card.Header className="d-flex justify-content-between align-items-center">
                    <Card.Subtitle>{_}</Card.Subtitle>
                    {index === 0 && (
                      <Image
                        src="/tournament.png"
                        alt="club_img"
                        width={"30px"}
                      />
                    )}
                    {index === 1 && (
                      <Image
                        src="/pigeon.png"
                        alt="pigeon_img"
                        width={"30px"}
                      />
                    )}
                    {index === 2 && (
                      <Image
                        src="/banner.png"
                        alt="banner_img"
                        width={"30px"}
                      />
                    )}
                  </Card.Header>
                  <Card.Body className="d-flex justify-content-between align-items-center">
                    <Card.Subtitle className="mb-2 display-3 text-secondary">
                      {(index === 0 && tournaments.length) ||
                        (index === 1 && owners.length) ||
                        (index === 2 && banners.length)}
                    </Card.Subtitle>
                    <Progress
                      type="circle"
                      percent={
                        (index === 0 && tournaments.length * 100) ||
                        (index === 1 && tournaments.length * 100) ||
                        (index === 2 && owners.length * 100)
                      }
                      size={"small"}
                    />
                  </Card.Body>
                </Card>
              </>
            );
          })}
      </div>
    </div>
  );
};

export default AdminDashboard;
