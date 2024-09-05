import { Menu } from "antd";
import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const ClubDashboardContainer = () => {
  const navigate = useNavigate();
  const onClick = (e) => {
    navigate(`${e.key}`);
  };
  const slug = JSON.parse(localStorage.getItem("user")).slug;

  const items = [
    {
      key: "1",
      label: "Tournament",
      children: [
        {
          key: `/club/${slug}/tournaments`,
          label: "Tournaments",
        },
        {
          type: "divider",
        },
        {
          key: `/club/${slug}/createTournaments`,
          label: "Create Tournament",
        },
      ],
    },
    {
      key: "2",
      label: "Pigeon Owner",
      children: [
        {
          key: `/club/${slug}/pigeonOwners`,
          label: "Pigeon Owner",
        },
        {
          type: "divider",
        },
        {
          key: `/club/${slug}/pigeonOwnerForm`,
          label: "Pigeon Form",
        },
      ],
    },
    // {
    //   key: "3",
    //   label: "Results",
    //   children: [
    //     {
    //       key: `/club/${slug}/pigeonResultForm`,
    //       label: "Create Results",
    //     },
    //     {
    //       type: "divider",
    //     },
    //   ],
    // },
  ];

  return (
    <div className="d-flex gap-1">
      <Menu
        onClick={onClick}
        style={{
          width: 256,
        }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        items={items}
      />
      <div className="w-100 pb-4">
        <h4 className="py-2 px-1">
          Welcome to <span className="badge text-bg-info">{slug}</span>
        </h4>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default ClubDashboardContainer;
