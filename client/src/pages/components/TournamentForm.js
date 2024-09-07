// import { Select } from "antd";
import { Breadcrumb } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";

const TournamentForm = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [tournamentDetails, setTournamentDetails] = useState({
    owner_id: user.id,
    image: "",
    tournamentName: "",
    tournamentInformation: "",
    category: "",
    startDate: "",
    numberOfDays: "",
    startTime: "",
    numberOfPigeons: "",
    noteTimeForPigeons: "",
    helperPigeons: "",
    continueDays: "",
    status_: "in active",
    type: "",
    numberOfPrizes: "",
    prize1: "",
    prize2: "",
    prize3: "",
    prize4: "",
    prize5: "",
  });
  const [owners, setOwners] = useState([]);
  const fetchOwners = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/allowners"
      );
      const options = response.data.map((_, index) => {
        return {
          label: _.name,
          value: _.name,
        };
      });
      setOwners(options);
    } catch (error) {
      console.error("Error fetching owners:", error);
    }
  };

  useEffect(() => {
    fetchOwners();
  }, []);

  const handleFormChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      // Handle the image file
      const file = files[0]; // Get the first selected file
      setTournamentDetails((prevTournament) => {
        return {
          ...prevTournament,
          [name]: file, // Store the file in the state
        };
      });
    } else {
      // Handle text/other input types
      setTournamentDetails((prevTournament) => {
        return {
          ...prevTournament,
          [name]: value,
        };
      });
    }
  };
  console.log(tournamentDetails);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response;
    try {
      response = await axios.post(
        "http://localhost:8080/api/v1/tournaments/",
        tournamentDetails,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);

      if (response.status === 201) {
        toast.success(response.data.message);
        if (user.role === 1) {
          setTimeout(() => {
            navigate("/tournaments");
          }, [3000]);
        } else {
          setTimeout(() => {
            navigate(`/club/${user.slug}/tournaments`);
          }, [3000]);
        }
      }
    } catch (error) {
      console.log(error.response.data);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Breadcrumb
        style={{ color: "#ffa76e" }}
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
                    color: isActive ? "black" : "#ffa76e",
                    fontWeight: isActive ? "normal" : "bold",
                    backgroundColor: isActive ? "#ffa76e" : "",
                    viewTransitionName: isTransitioning ? "slide" : "",
                  };
                }}
                className={"text-decoration-none"}
                to={`/club/:${user.slug}/`}
              >
                Tournaments
              </NavLink>
            ),
          },
          {
            title: (
              <NavLink
                style={({ isActive, isTransitioning }) => {
                  return {
                    color: isActive ? "black" : "#ffa76e",
                    fontWeight: isActive ? "normal" : "bold",
                    backgroundColor: isActive ? "#ffa76e" : "",
                    viewTransitionName: isTransitioning ? "slide" : "",
                  };
                }}
                to={`/club/:${user.slug}/createTournaments`}
                className={"text-decoration-none"}
              >
                Create Tournament
              </NavLink>
            ),
          },
        ]}
      />
      <Form
        onSubmit={handleSubmit}
        className="d-flex gap-2 px-3 w-100 flex-column align-items-center"
      >
        <Form.Group className="w-100">
          <Form.Label className="label-size" htmlFor="disabledTextInput">
            <span className="star">
              <sup>*</sup>{" "}
            </span>
            Tournament Name
          </Form.Label>
          <Form.Control
            size="sm"
            required
            placeholder="tournament Name"
            name="tournamentName"
            type="text"
            value={tournamentDetails.tournamentName}
            onChange={handleFormChange}
          />
        </Form.Group>
        <Form.Group className="w-100">
          <Form.Label className="label-size" htmlFor="disabledTextInput">
            Image
          </Form.Label>
          <Form.Control
            size="sm"
            name="image"
            type="file"
            // value={tournamentDetails.image}
            onChange={handleFormChange}
          />
        </Form.Group>

        <Form.Group className="w-100">
          <Form.Label className="label-size" htmlFor="disabledTextInput">
            Tournament Information
          </Form.Label>
          <Form.Control
            size="sm"
            type="text"
            placeholder="tournament Information"
            name="tournamentInformation"
            value={tournamentDetails.tournamentInformation}
            onChange={handleFormChange}
          />
        </Form.Group>
        <Form.Group className="w-100">
          <Form.Label className="label-size" htmlFor="disabledTextInput">
            Start Time
          </Form.Label>
          <Form.Control
            size="sm"
            type="time"
            placeholder="tournament Information"
            name="startTime"
            value={tournamentDetails.startTime}
            onChange={handleFormChange}
          />
        </Form.Group>

        <Form.Group className="w-100">
          <Form.Label className="label-size">Category</Form.Label>
          <Form.Control
            size="sm"
            placeholder="Category"
            name="category"
            type="text"
            value={tournamentDetails.category}
            onChange={handleFormChange}
          />
        </Form.Group>
        <Form.Group className="w-100">
          <Form.Label className="label-size">
            <span className="star">
              <sup>*</sup>{" "}
            </span>
            Start Date
          </Form.Label>
          <Form.Control
            size="sm"
            placeholder="Start Date"
            name="startDate"
            type="date"
            required
            value={tournamentDetails.startDate}
            onChange={handleFormChange}
          />
        </Form.Group>
        <Form.Group className="w-100">
          <Form.Label className="label-size">Number Of Days</Form.Label>
          <Form.Control
            size="sm"
            placeholder="Start Date"
            name="numberOfDays"
            type="number"
            value={tournamentDetails.numberOfDays}
            onChange={handleFormChange}
          />
        </Form.Group>
        <Form.Group className="w-100">
          <Form.Label className="label-size">Number Of Pigeons </Form.Label>
          <Form.Control
            size="sm"
            placeholder="Enter pigeons"
            name="numberOfPigeons"
            type="number"
            value={tournamentDetails.numberOfPigeons}
            onChange={handleFormChange}
          />
        </Form.Group>
        <Form.Group className="w-100">
          <Form.Label className="label-size">Note Time For Pigeons </Form.Label>
          <Form.Control
            size="sm"
            placeholder="Enter note time pigeons"
            name="noteTimeForPigeons"
            type="time"
            value={tournamentDetails.noteTimeForPigeons}
            onChange={handleFormChange}
          />
        </Form.Group>
        <Form.Group className="w-100">
          <Form.Label className="label-size">
            Number Of Helper Pigeons{" "}
          </Form.Label>
          <Form.Control
            size="sm"
            placeholder="Enter helper pigeons"
            name="helperPigeons"
            type="number"
            value={tournamentDetails.helperPigeons}
            onChange={handleFormChange}
          />
        </Form.Group>
        <Form.Group className="w-100">
          <Form.Label className="label-size">Continue Days </Form.Label>
          <Form.Control
            size="sm"
            placeholder="Enter Continue Days"
            name="continueDays"
            type="number"
            value={tournamentDetails.continueDays}
            onChange={handleFormChange}
          />
        </Form.Group>
        <Form.Group className="w-100">
          <Form.Label className="label-size">Status_</Form.Label>
          <Form.Select
            name="status_"
            type="text"
            size="sm"
            onChange={handleFormChange}
            value={tournamentDetails.status_}
          >
            {["", "active", "in active"].map((_, index) => {
              return (
                <option key={index} value={_}>
                  {_}
                </option>
              );
            })}
          </Form.Select>
        </Form.Group>

        {/* <Form.Group className="w-100">
          <Form.Label className="label-size">participatingLoft</Form.Label>
          <Select
            className="w-50 px-2"
            mode="multiple"
            size={"large"}
            placeholder="Please select"
            onChange={handleLoftChange}
            options={owners}
          />
        </Form.Group> */}

        <Form.Group className="w-100">
          <Form.Label className="label-size"> Type </Form.Label>
          <Form.Control
            size="sm"
            placeholder="Enter type"
            name="type"
            type="text"
            value={tournamentDetails.type}
            onChange={handleFormChange}
          />
        </Form.Group>
        <Form.Group className="w-100">
          <Form.Label className="label-size"> Number Of Prizes </Form.Label>
          <Form.Control
            size="sm"
            placeholder="Enter Number Of Prizes"
            name="numberOfPrizes"
            type="text"
            value={tournamentDetails.numberOfPrizes}
            onChange={handleFormChange}
          />
        </Form.Group>
        <React.Fragment>
          {["prize1", "prize2", "prize3", "prize4", "prize5"].map(
            (_, index) => {
              return (
                <Form.Group className="w-100" key={index}>
                  <Form.Label className="text-capitalize label-size">
                    {_}
                  </Form.Label>
                  <Form.Control
                    size="sm"
                    placeholder={`Enter ${_}`}
                    name={_}
                    type="number"
                    value={tournamentDetails._}
                    onChange={handleFormChange}
                  />
                </Form.Group>
              );
            }
          )}
        </React.Fragment>

        <Button variant="outline-primary" size="sm" type="submit">
          Submit
        </Button>
        <Toaster />
      </Form>
    </>
  );
};

export default TournamentForm;
