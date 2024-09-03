import React, { useState, useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { Button, Table } from "react-bootstrap";

const PigeonOwnerContainer = () => {
  const [owners, setOwners] = useState([]);

  const fetchOwners = async () => {
    try {
      const response = await axios.get("/api/v1/allowners"); // Adjust the URL to your backend endpoint
      setOwners(response.data);
    } catch (error) {
      console.error("Error fetching owners:", error);
    }
  };
  useEffect(() => {
    fetchOwners();
  }, []);

  const [editingOwner, setEditingOwner] = useState(null);
  const [deletingOwner, setDeletingOwner] = useState(null);

  const handleEditClick = (owner) => {
    setEditingOwner(owner); // Open the modal with owner data
  };

  const handleSave = async (id, updatedData) => {
    try {
      const response = await axios.put(`/api/v1/owners/${id}`, updatedData);
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
        /api/v1/owners/${deletingOwner._id}`);
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

  const [currentPage, setCurrentPage] = useState(1);
  const [storesPerPage] = useState(20); // Number of stores per
  const indexOfLastStore = currentPage * storesPerPage;
  const indexOfFirstStore = indexOfLastStore - storesPerPage;
  const currentStores = owners.slice(indexOfFirstStore, indexOfLastStore);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div id="zooma">
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
            <th>Contacts</th>
            <th>City</th>
            <th colSpan={2}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentStores.map((owner, index) => (
            <tr key={owner._id}>
              <td>{index + 1 + (currentPage - 1) * storesPerPage}</td>
              <td>
                {owner.image ? (
                  <img
                    src={`/uploads/${owner.image}`}
                    alt={owner.name}
                    width="40"
                    height="40"
                  />
                ) : (
                  "No image"
                )}
              </td>
              <td>{owner.name}</td>
              <td>{owner.contacts}</td>
              <td>{owner.city}</td>
              <td>
                <Button
                  size="sm"
                  variant="outline-primary"
                  onClick={() => handleEditClick(owner)}
                >
                  Edit
                </Button>
              </td>
              <td>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDeleteClick(owner)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <nav>
        <ul className="pagination justify-content-center">
          {[...Array(Math.ceil(owners.length / storesPerPage)).keys()].map(
            (number) => (
              <li
                key={number}
                className={`page-item ${
                  currentPage === number + 1 ? "active" : ""
                }`}
              >
                <button
                  onClick={() => paginate(number + 1)}
                  className="page-link"
                >
                  {number + 1}
                </button>
              </li>
            )
          )}
        </ul>
      </nav>
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
