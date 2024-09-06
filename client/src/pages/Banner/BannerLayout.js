import { Breadcrumb } from "antd";
import React from "react";
import { Container } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";

const BannerLayout = () => {
  return (
    <div>
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
                  to={"/banners"}
                >
                  Banners
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
                  to={"/banners/bannerForm"}
                >
                  Create Banner
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

export default BannerLayout;
