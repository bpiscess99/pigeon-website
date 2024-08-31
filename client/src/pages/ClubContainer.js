import { Breadcrumb } from "antd";
import { Container } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";

const ClubContainer = () => {
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
                  to={"/clubs"}
                  style={({ isActive, isTransitioning }) => {
                    return {
                      color: isActive ? "orange" : "black",
                      fontWeight: isActive ? "bold" : "normal",
                      viewTransitionName: isTransitioning ? "slide" : "",
                    };
                  }}
                >
                  Clubs
                </NavLink>
              ),
            },
            {
              title: (
                <NavLink
                  to={"/clubs/create"}
                  style={({ isActive, isTransitioning }) => {
                    return {
                      color: isActive ? "orange" : "black",
                      fontWeight: isActive ? "bold" : "normal",
                      viewTransitionName: isTransitioning ? "slide" : "",
                    };
                  }}
                >
                  Create Club
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

export default ClubContainer;
