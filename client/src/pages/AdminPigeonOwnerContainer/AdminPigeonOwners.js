import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Button, Image, Table } from "react-bootstrap";
import { Breadcrumb, Select, Tag } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import TournamentContext from "../Contexts/TournamentContext";

const AdminPigeonOwners = () => {
  const [owners, setOwners] = useState([]);
  //   const [tournaments, setTournaments] = useState([]);
  const [editingOwner, setEditingOwner] = useState(null);
  const [deletingOwner, setDeletingOwner] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const { fetchTournaments, tournaments } = useContext(TournamentContext);
  const handleEditClick = (owner) => {
    setEditingOwner(owner); // Open the modal with owner data
  };

  const handleSave = async (id, updatedData) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/v1/owners/${id}`,
        updatedData
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setOwners(
          owners.map((owner) =>
            owner._id === id ? response.data.owner : owner
          )
        );
        setEditingOwner(null); // Close the modal
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error updating owner:", error);
      toast.error("Something went wrong");
    }
  };

  // Function to handle delete click
  const handleDeleteClick = (owner) => {
    setDeletingOwner(owner); // Open the delete confirmation modal
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await axios.delete(`
        http://localhost:8080/api/v1/owners/${deletingOwner._id}`);
      if (response.data.success) {
        toast.success(response.data.message);
        setOwners(owners.filter((owner) => owner._id !== deletingOwner._id)); // Remove the deleted owner from the list
        setDeletingOwner(null); // Close the delete confirmation modal
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting owner:", error);
      toast.error("Something went wrong");
    }
  };
  const [activeTournamentId, setActiveTournamentId] = useState("");

  const fetchTournamentPigeons = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/pigeonOwners/:${id}`
      );
      if (response.data.success) {
        setOwners(response.data.pigeonOwners);
        setActiveTournamentId(id);
      }
    } catch (error) {
      console.error("Error fetching clubs:", error);
    }
  };

  useEffect(() => {
    fetchTournaments();
  }, []);

  return (
    <div>
      <div className="d-flex px-2 justify-content-center gap-2">
        {tournaments &&
          tournaments.map((_, index) => {
            return (
              <Button
                size="sm"
                variant={activeTournamentId === _._id ? "dark" : "outline-dark"}
                key={index}
                onClick={() => {
                  fetchTournamentPigeons(_._id);
                  setActiveTournamentId(_._id);
                }}
              >
                {_.tournamentName}
              </Button>
            );
          })}
      </div>
      <div className="px-4 py-2">
        <Table responsive striped border={"1px solid grey"} hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Contacts</th>
              <th>City</th>
              <th>Results</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {owners.map((owner, index) => (
              <tr key={owner._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={`http://localhost:8080/uploads/${owner.image}`}
                    alt={owner.name}
                    width="40"
                    height="40"
                  />
                </td>
                <td>{owner.name}</td>
                <td>
                  {owners.length > 0 ? (
                    <Tag color="orange">{owner.contacts}</Tag>
                  ) : (
                    <div className="d-flex justify-content-center">
                      <Image src="/empty.png" alt="empty_img" />
                    </div>
                  )}
                </td>
                <td>{owner.city}</td>
                <td>
                  <div className="d-flex gap-1">
                    {owner.pigeonsResults !== undefined ? (
                      <Button
                        size="sm"
                        variant="outline-dark"
                        onClick={() => {
                          navigate(`/pigeonOwners/updatePigeonOwnerResult`, {
                            state: { owner },
                          });
                        }}
                      >
                        Update
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline-dark"
                        onClick={() => {
                          navigate(`/pigeonOwners/addPigeonOwnerResult`, {
                            state: { owner },
                          });
                        }}
                      >
                        Add
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline-dark"
                      onClick={() => {
                        navigate(`/pigeonOwners/pigeonOwnerResult`, {
                          state: { owner },
                        });
                      }}
                    >
                      View
                    </Button>
                  </div>
                </td>

                <td>
                  <div className="d-flex gap-1">
                    <Button
                      size="sm"
                      variant="outline-dark"
                      onClick={() => handleEditClick(owner)}
                    >
                      <EditOutlined />
                    </Button>

                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDeleteClick(owner)}
                    >
                      <DeleteOutlined />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      {editingOwner && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Owner</h5>
                <Button
                  type="button"
                  variant="outline-dark"
                  size="sm"
                  onClick={() => setEditingOwner(null)}
                >
                  <span>&times;</span>
                </Button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  value={editingOwner.name}
                  onChange={(e) =>
                    setEditingOwner({ ...editingOwner, name: e.target.value })
                  }
                  placeholder="Enter Name"
                  className="form-control mb-3"
                />
                <input
                  type="text"
                  value={editingOwner.contacts}
                  onChange={(e) =>
                    setEditingOwner({
                      ...editingOwner,
                      contacts: e.target.value,
                    })
                  }
                  placeholder="Enter Contacts"
                  className="form-control mb-3"
                />
                <input
                  type="text"
                  value={editingOwner.city}
                  onChange={(e) =>
                    setEditingOwner({ ...editingOwner, city: e.target.value })
                  }
                  placeholder="Enter City"
                  className="form-control mb-3"
                />
              </div>
              <div className="modal-footer">
                <Button
                  type="button"
                  variant="outline-dark"
                  size="sm"
                  onClick={() => setEditingOwner(null)}
                >
                  Close
                </Button>
                <Button
                  type="button"
                  variant="success"
                  size="sm"
                  onClick={() => handleSave(editingOwner._id, editingOwner)}
                >
                  Save changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Delete Confirmation Modal */}
      {deletingOwner && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setDeletingOwner(null)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>
                  Are you sure you want to delete the owner "
                  {deletingOwner.name}"?
                </p>
              </div>
              <div className="modal-footer">
                <Button
                  type="button"
                  variant="outline-dark"
                  size="sm"
                  onClick={() => setDeletingOwner(null)}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="outline-danger"
                  size="sm"
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
export default AdminPigeonOwners;
