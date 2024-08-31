import axios from "axios";
import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const CreateTournament = () => {
  const navigate = useNavigate();
  const { id } = JSON.parse(localStorage.getItem("user"));
  console.log(id);

  const [tournamentDetails, setTournamentDetails] = useState({
    owner_id: id,
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
    participatingLoft: [],
    numberOfPrizes: "",
    prize1: "",
    prize2: "",
    prize3: "",
    prize4: "",
    prize5: "",
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setTournamentDetails((prevTournament) => {
      return {
        ...prevTournament,
        [name]: value,
      };
    });
  };
  const handleParticipatingLofts = (e) => {
    const lofts = [];
    e.forEach((_) => {
      lofts.push(_.value);
    });
    setTournamentDetails((prevState) => {
      return {
        ...prevState,
        participatingLoft: lofts,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response;
    console.log(tournamentDetails);

    try {
      response = await axios.post(
        "http://localhost:8080/api/v1/tournaments/",
        tournamentDetails
      );
      console.log(response);

      if (response.status === 201) {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/tournaments");
        }, [3000]);
      }
    } catch (error) {
      console.log(error.response.data);
      toast.error(error.response.data.message);
    }
  };

  return (
    <Container>
      <h5 className="text-center">Create Tournament</h5>
      <Form
        onSubmit={handleSubmit}
        className="d-flex gap-2 px-3 flex-column align-items-center"
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
            value={tournamentDetails.image}
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

        <Form.Group className="w-100">
          <Form.Label className="label-size">participatingLoft</Form.Label>
          <Select
            options={options}
            name="participatingLoft"
            type="text"
            isMulti
            onChange={handleParticipatingLofts}
          />
        </Form.Group>

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
    </Container>
  );
};

export default CreateTournament;
