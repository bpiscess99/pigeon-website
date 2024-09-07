import React from "react";
import { Breadcrumb } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";

const AdminPigeonOwnerContainer = () => {
  return (
    <div>
      <Breadcrumb className="px-4 text-decoration-none">
        <Breadcrumb.Item className="text-decoration-none">
          Dashboard
        </Breadcrumb.Item>
        <Breadcrumb.Item className="text-decoration-none px-3">
          <NavLink
            style={({ isActive, isTransitioning }) => {
              return {
                color: isActive ? "black" : "#ffa76e",
                fontWeight: isActive ? "normal" : "bold",
                backgroundColor: isActive ? "#ffa76e" : "",
                viewTransitionName: isTransitioning ? "slide" : "",
              };
            }}
            className="text-decoration-none px-3 rounded"
            to="/pigeonOwners"
          >
            Pigeon Owners
          </NavLink>
        </Breadcrumb.Item>
        <Breadcrumb.Item className="text-decoration-none">
          <NavLink
            style={({ isActive, isTransitioning }) => {
              return {
                color: isActive ? "black" : "#ffa76e",
                fontWeight: isActive ? "normal" : "bold",
                backgroundColor: isActive ? "#ffa76e" : "",
                viewTransitionName: isTransitioning ? "slide" : "",
              };
            }}
            className="text-decoration-none px-3 rounded"
            to="/pigeonOwners/pigeonOwnerForm"
          >
            Create Pigeon Owner
          </NavLink>
        </Breadcrumb.Item>
      </Breadcrumb>
      <Outlet />
    </div>
  );
};

export default AdminPigeonOwnerContainer;
