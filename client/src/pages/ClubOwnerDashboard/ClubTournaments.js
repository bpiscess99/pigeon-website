import { Table, Tag } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ClubTournaments = () => {
  const [tournaments, setTournaments] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

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
  const columns = [
    {
      title: "Tournament",
      dataIndex: "tournamentName",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Number Of Prizes",
      dataIndex: "numberOfPrizes",
    },
    {
      title: "Number Of Pigeons",
      dataIndex: "numberOfPigeons",
    },
    {
      title: "Start Date",
      dataIndex: "startDate",
      render: (_, { tags }) => {
        const date = _.slice(0, 10);
        return <Tag> {date}</Tag>;
      },
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
    },
    {
      title: "Status",
      dataIndex: "status_",
      render: (_, { tags }) => {
        const color = _.length <= 6 ? "red" : "blue";
        return <Tag color={color}> {_}</Tag>;
      },
    },
    {
      title: "Tournament Information",
      dataIndex: "tournamentInformation",
    },
    {
      title: "Helper Pigeons",
      dataIndex: "helperPigeons",
    },
    {
      title: "Continue Days",
      dataIndex: "continueDays",
    },
    {
      title: "Number of Days",
      dataIndex: "numberOfDays",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "First Prize",
      dataIndex: "prize1",
    },
    {
      title: "2nd Prize",
      dataIndex: "prize2",
    },
    {
      title: "3rd Prize",
      dataIndex: "prize3",
    },
    {
      title: "4th Prize",
      dataIndex: "prize4",
    },

    {
      title: "5th Prize",
      dataIndex: "prize5",
    },
    {
      title: "Participating Loft",
      dataIndex: "actions",
      render: (rowRecord) => {
        return (
          <Button
            size="sm"
            variant="outline-info"
            onClick={() => {
              navigate(`/club/${user.slug}/pigeonOwners`);
            }}
          >
            Participants
          </Button>
        );
      },
    },
  ];

  return (
    <Container>
      <Table
        columns={columns}
        scroll={{ x: 1300 }}
        pagination={false}
        dataSource={tournaments && tournaments}
        size="small"
        rowKey={(rowRecord) => rowRecord.id || rowRecord._id}
      />
    </Container>
  );
};

export default ClubTournaments;
