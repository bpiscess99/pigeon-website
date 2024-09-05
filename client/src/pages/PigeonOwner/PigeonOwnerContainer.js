import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Button, Table } from "react-bootstrap";
import { Tag } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

const PigeonOwnerContainer = () => {
  const [owners, setOwners] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [editingOwner, setEditingOwner] = useState(null);
  const [deletingOwner, setDeletingOwner] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  const slug = JSON.parse(localStorage.getItem("user")).slug;
  const state = useLocation().state;

  console.log(state, "--------");

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

  const fetchClubTournaments = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/tournaments/club/:${user.id}`
      );
      if (response.data.success) {
        setTournaments(response.data.clubTournaments);
        if (response.data.clubTournaments.length > 0) {
          fetchTournamentPigeons(response.data.clubTournaments[0]._id);
        }
      }
    } catch (error) {
      console.error("Error fetching clubs:", error);
    }
  };

  const fetchTournamentPigeons = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/pigeonOwners/:${id}`
      );
      if (response.data.success) {
        setOwners(response.data.pigeonOwners);
      }
    } catch (error) {
      console.error("Error fetching clubs:", error);
    }
  };

  useEffect(() => {
    fetchClubTournaments();
  }, []);

  return (
    <div>
      <div className="d-flex gap-2">
        {tournaments &&
          tournaments.map((_, index) => {
            return (
              <Button
                size="sm"
                variant={`${index === 0 ? "info" : "outline-info"}`}
                key={index}
                onClick={(e) => fetchTournamentPigeons(_._id)}
              >
                {_.tournamentName}
              </Button>
            );
          })}
      </div>

      <Table responsive>
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
          {owners.length > 0 &&
            owners.map((owner, index) => (
              <tr key={owner._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={`/uploads/${owner.image}`}
                    alt={owner.name}
                    width="40"
                    height="40"
                  />
                </td>
                <td>{owner.name}</td>
                <td>
                  <Tag color="orange">{owner.contacts}</Tag>
                </td>
                <td>{owner.city}</td>
                <td>
                  <div className="d-flex flex-column gap-1">
                    {owner.pigeonsResults !== undefined ? (
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => {
                          navigate(`/club/${slug}/pigeonOwnerResultUpdate`, {
                            state: { owner },
                          });
                        }}
                      >
                        Update
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        variant="outline-primary"
                        onClick={() => {
                          navigate(`/club/${slug}/pigeonResultForm`, {
                            state: { owner },
                          });
                        }}
                      >
                        Add
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline-info"
                      onClick={() => {
                        navigate(`/club/${slug}/pigeonOwnerResults`, {
                          state: { owner },
                        });
                      }}
                    >
                      View
                    </Button>
                  </div>
                </td>

                <td>
                  <div className="d-flex flex-column gap-1">
                    <Button
                      size="sm"
                      variant="outline-primary"
                      onClick={() => handleEditClick(owner)}
                    >
                      Edit
                    </Button>

                    <Button
                      size="sm"
                      variant="danger"
                      onClick={() => handleDeleteClick(owner)}
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>

      {editingOwner && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Owner</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setEditingOwner(null)}
                >
                  <span>&times;</span>
                </button>
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
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setEditingOwner(null)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleSave(editingOwner._id, editingOwner)}
                >
                  Save changes
                </button>
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
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setDeletingOwner(null)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleConfirmDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PigeonOwnerContainer;
