import React from "react";
import { Outlet } from "react-router-dom";

const ClubDashboardContainer = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);

  return (
    <div className="d-flex gap-1">
      <div className="w-100 pb-4">
        <h4 className="py-2 px-1 text-center">
          Welcome to{" "}
          <h4
            className="text-capitalize fw-bolder"
            style={{
              color: "#ffa76e",
              textShadow: "1px 1px 2px",
              display: "inline",
            }}
          >
            {user.slug}
          </h4>
        </h4>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ClubDashboardContainer;
