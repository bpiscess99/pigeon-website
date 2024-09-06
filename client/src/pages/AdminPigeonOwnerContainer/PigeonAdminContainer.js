import { Breadcrumb } from "antd";
import React from "react";
import { Container } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";

const PigeonAdminContainer = () => {
  console.log(localStorage.getItem("user"));

  return (
    <div className="py-3">
      <Container>
        <Breadcrumb
          className="px-2 pb-2"
          items={[
            {
              title: "Dashboard",
            },
            {
              title: (
                <NavLink
                  style={({ isActive, isTransitioning }) => {
                    return {
                      color: isActive ? "orange" : "black",
                      fontWeight: isActive ? "bold" : "normal",
                      viewTransitionName: isTransitioning ? "slide" : "",
                    };
                  }}
                  to={"/tournaments"}
                >
                  Pigeon Owners
                </NavLink>
              ),
            },
            {
              title: (
                <NavLink
                  style={({ isActive, isTransitioning }) => {
                    return {
                      color: isActive ? "orange" : "black",
                      fontWeight: isActive ? "bold" : "normal",
                      viewTransitionName: isTransitioning ? "slide" : "",
                    };
                  }}
                  to={"/tournaments/tournamentForm"}
                >
                  Create Pigeon Owners
                </NavLink>
              ),
            },
          ]}
        />
      </Container>
      <Outlet />
    </div>
  );
};

export default PigeonAdminContainer;
