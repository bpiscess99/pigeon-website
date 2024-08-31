import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { Avatar, Card } from "antd";
import { Button, Image } from "react-bootstrap";
const Clubs = () => {
  const [clubs, setClubs] = useState([]);

  useEffect(() => {
    const fetchClubs = async () => {
      try {
        const response = await axios.get("/api/v1/auth/clubs");
        if (response.data.success) {
          const filteredClubs = response.data.clubs.filter(
            (club) => club.role === 0
          );
          setClubs(filteredClubs);
        }
      } catch (error) {
        console.error("Error fetching clubs:", error);
      }
    };
    fetchClubs();
  }, []);
  const [editingClub, setEditingClub] = useState(null);

  const handleEditClick = (club) => {
    setEditingClub(club); // Open the modal with the club data
  };
  const [deletingClub, setDeletingClub] = useState(null); // For deleting
  const handleDeleteClick = (club) => {
    setDeletingClub(club); // Open the delete confirmation modal
  };

  const handleSave = async (id, updatedData) => {
    try {
      const response = await axios.put(`/api/v1/auth/clubs/${id}`, updatedData);
      if (response.data.success) {
        toast.success(response.data.message);
        setClubs(
          clubs.map((club) => (club._id === id ? response.data.club : club))
        );
        setEditingClub(null); // Close the modal
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error updating club:", error);
      toast.error("Something went wrong");
    }
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await axios.delete(
        `/api/v1/auth/clubs/${deletingClub._id}`
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setClubs(clubs.filter((club) => club._id !== deletingClub._id)); // Remove the deleted club from the list
        setDeletingClub(null); // Close the delete confirmation modal
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting club:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div>
      <div className="d-flex flex-wrap justify-content-center gap-2 align-items-start">
        {clubs.map((club) => (
          <Card
            key={club._id}
            actions={[
              <Button
                size="sm"
                variant="outline-info"
                onClick={() => handleEditClick(club)}
              >
                <EditOutlined key="edit" /> Edit
              </Button>,
              <Button
                size="sm"
                variant="outline-danger"
                onClick={() => handleDeleteClick(club)}
              >
                <DeleteOutlined /> Delete
              </Button>,
            ]}
            style={{
              width: 270,
            }}
          >
            <Card.Meta
              avatar={<Avatar src="/clubs.png" alt="club_image" />}
              title={club.cname}
              description={
                <div>
                  <h5>
                    <span className="badge text-bg-info">{club.name}</span>
                  </h5>
                  <h6 className="d-flex flex-column">
                    <Image src="/gmail.png" width={"25px"} />
                    <strong>{club.email}</strong>{" "}
                  </h6>
                </div>
              }
            />
          </Card>
        ))}
      </div>

      {editingClub && (
        <div
          className="modal show d-block text-secondary"
          tabIndex="-1"
          role="dialog"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <p className="modal-title">Edit Club</p>
                <Button
                  variant="outline-danger"
                  size="sm"
                  type="button"
                  className="close"
                  onClick={() => setEditingClub(null)}
                >
                  <span>&times;</span>
                </Button>
              </div>
              <div className="modal-body text-secondary">
                <input
                  type="text"
                  value={editingClub.name}
                  onChange={(e) =>
                    setEditingClub({ ...editingClub, name: e.target.value })
                  }
                  placeholder="Enter Name"
                  className="form-control mb-2"
                />
                <input
                  type="text"
                  value={editingClub.cname}
                  onChange={(e) =>
                    setEditingClub({ ...editingClub, cname: e.target.value })
                  }
                  placeholder="Enter Club Name"
                  className="form-control mb-2"
                />
                <input
                  type="email"
                  value={editingClub.email}
                  onChange={(e) =>
                    setEditingClub({ ...editingClub, email: e.target.value })
                  }
                  placeholder="Enter Email"
                  className="form-control"
                />
              </div>
              <div className="modal-footer">
                <Button
                  size="sm"
                  type="button"
                  variant="outline-primary"
                  onClick={() => setEditingClub(null)}
                >
                  Close
                </Button>
                <Button
                  size="sm"
                  type="button"
                  variant="outline-primary"
                  onClick={() => handleSave(editingClub._id, editingClub)}
                >
                  Save changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {deletingClub && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <p className="modal-title">Confirm Delete</p>
                <Button
                  type="button"
                  size="sm"
                  variant="outline-danger"
                  className="close"
                  onClick={() => setDeletingClub(null)}
                >
                  <span>&times;</span>
                </Button>
              </div>
              <div className="modal-body">
                <p>
                  Are you sure you want to delete the club "{deletingClub.cname}
                  "?
                </p>
              </div>
              <div className="modal-footer">
                <Button
                  type="button"
                  size="sm"
                  variant="outline-primary"
                  onClick={() => setDeletingClub(null)}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline-danger"
                  onClick={handleConfirmDelete}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clubs;
