import axios from "axios";
import React, { useRef, useState } from "react";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const PigeonOwnerForm = () => {
  const [phoneError, setPhoneError] = useState("");
  const [phone, setPhone] = useState("");
  const formRef = useRef(null);
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [tournaments, setTournaments] = useState([]);
  const [owners, setOwners] = useState([]);
  const slug = JSON.parse(localStorage.getItem("user")).slug;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", event.target.name.value);
    formData.append("contacts", phone);
    formData.append("city", event.target.city.value);
    if (image) {
      formData.append("image", image);
    }
    formData.append("tournament", event.target.tournament.value);
    try {
      const response = await fetch("/api/v1/owner", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast.success("Owner created successfully");
        fetchOwners();
        formRef.current.reset();
        setImage(null);
        setTimeout(() => {
          navigate(`/club/${slug}/pigeonOwners`);
        }, 3000);
      } else {
        toast.error("Failed to create Owner");
      }
    } catch (error) {
      toast.error("An error occurred");
    }
  };

  const fetchOwners = async () => {
    try {
      const response = await axios.get("/api/v1/allowners"); // Adjust the URL to your backend endpoint
      setOwners(response.data);
    } catch (error) {
      console.error("Error fetching owners:", error);
    }
  };

  const handlePhoneChange = (e) => {
    const newPhone = e.target.value;
    // Validate for digits and symbols (+, -, (, ))
    if (/^[\d+\-()]*$/.test(newPhone)) {
      setPhone(newPhone);
      setPhoneError("");
    } else {
      setPhoneError("Phone number can only contain digits and symbols + - ( )");
    }
  };
  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const fetchTournaments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/tournaments/"
      );
      setTournaments(response.data.tournaments);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };
  useEffect(() => {
    fetchTournaments();
  }, []);

  return (
    <div className="row p-3">
      <div className="col-lg-7">
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="card-title">Enter Details</h5>
            </div>
            <form
              ref={formRef}
              className="row g-3"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              <div className=" me-3 d-flex align-items-center gap-3">
                <label>Tournament</label>
                <select
                  className="aaq form-control"
                  type="text"
                  id="tournament"
                  name="tournament"
                  placeholder="tournament"
                  required
                >
                  <option value=""></option>
                  {tournaments &&
                    tournaments.map((_, index) => {
                      return (
                        <option key={index} value={_._id}>
                          {_.tournamentName}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="me-3 d-flex align-items-center gap-3">
                <label>Name</label>
                <input
                  className="aaq form-control"
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                  required
                />
              </div>

              <div className=" me-3 d-flex align-items-center gap-3">
                <label>Phone</label>
                <input
                  className={`aaq form-control ${
                    phoneError ? "is-invalid" : ""
                  }`}
                  type="text"
                  id="contacts"
                  name="contacts"
                  placeholder="Contact No."
                  value={phone}
                  onChange={handlePhoneChange}
                  required
                />
                {phoneError && (
                  <div className="invalid-feedback">{phoneError}</div>
                )}
              </div>
              <div className="me-3 d-flex align-items-center gap-3">
                <label>City</label>

                <input
                  className="aaq form-control"
                  type="text"
                  id="city"
                  name="city"
                  placeholder="Enter City"
                  required
                />
              </div>
              <div className="col-6 me-3" id="hyy">
                <input
                  type="file"
                  id="image"
                  placeholder="Upload image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
              <div className="col-4 ms-5">
                <button className="zza btn btn-primary w-100" type="submit">
                  Create Owner
                </button>
                <Toaster />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PigeonOwnerForm;
