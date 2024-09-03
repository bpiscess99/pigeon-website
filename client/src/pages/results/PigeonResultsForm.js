import { Select } from "antd";
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

const PigeonResultsForm = () => {
  const [resultsForm, setResultsForm] = useState({
    pigeonOwnerId: "",
    totalPigeons: Number,
    firstPigeonReturnTime: "",
    secondPigeonReturnTime: "",
    thirdPigeonReturnTime: "",
    fourthPigeonReturnTime: "",
    fifthPigeonReturnTime: "",
    sixthPigeonReturnTime: "",
    seventhPigeonReturnTime: "",
    total: "",
  });
  //   const navigate = useNavigate();
  const [pigeonOwners, setPigeonOwners] = useState([]);
  const handlePegionOwner = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/v1/allowners/"
      );
      setPigeonOwners(response.data);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };
  const options = pigeonOwners.map((_) => {
    return {
      value: _._id,
      label: _.name,
    };
  });
  useEffect(() => {
    handlePegionOwner();
  }, []);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setResultsForm((prevResultsForm) => {
      return {
        ...prevResultsForm,
        [name]: value,
      };
    });
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(resultsForm);

    try {
      const response = await axios.patch(
        "http://localhost:8080/api/v1/createResults/",
        resultsForm
      );
      console.log(response);
      if (response.status === 200) {
        toast.success(response.data.msg);
      }
    } catch (error) {
      console.log(error.response.data);
      toast.error(error.response.data.message);
    }
  };
  const handlePigeonChange = (id) => {
    setResultsForm((prevState) => {
      return {
        ...prevState,
        pigeonOwnerId: id,
      };
    });
  };

  return (
    <div>
      <Form
        className="p-3 d-flex flex-column align-items-start"
        onSubmit={handleFormSubmit}
      >
        <Form.Group className="w-50">
          <span className="star">*</span>
          <Form.Label className="label-size">Pigeon Owners</Form.Label>
          <Select
            className="w-50"
            name="pigeonOwnerId"
            placeholder="Please select"
            onChange={handlePigeonChange}
            options={options}
            type="text"
            value={resultsForm.pigeonOwnerId}
          />
        </Form.Group>

        <Form.Group className="w-50">
          <Form.Label className="label-size">Total Pigeons </Form.Label>
          <Form.Control
            size="sm"
            placeholder="total no Pigeons"
            name="totalPigeons"
            type="number"
            value={resultsForm.totalPigeons}
            onChange={handleFormChange}
          />
        </Form.Group>
        <Form.Group className="w-50">
          <Form.Label className="label-size">pigeon 1 return time</Form.Label>
          <Form.Control
            placeholder="pigeon 1 return time"
            name="firstPigeonReturnTime"
            type="time"
            size="sm"
            value={resultsForm.firstPigeonReturnTime}
            onChange={handleFormChange}
          />
        </Form.Group>
        <Form.Group className="w-50">
          <Form.Label className="label-size">pigeon 2 return time</Form.Label>
          <Form.Control
            placeholder="pigeon 2 return time"
            name="secondPigeonReturnTime"
            type="time"
            size="sm"
            value={resultsForm.secondPigeonReturnTime}
            onChange={handleFormChange}
          />
        </Form.Group>
        <Form.Group className="w-50">
          <Form.Label className="label-size">pigeon 3 return time</Form.Label>
          <Form.Control
            placeholder="pigeon 3 return time"
            name="thirdPigeonReturnTime"
            size="sm"
            type="time"
            value={resultsForm.thirdPigeonReturnTime}
            onChange={handleFormChange}
          />
        </Form.Group>
        <Form.Group className="w-50">
          <Form.Label className="label-size">pigeon 4 return time</Form.Label>
          <Form.Control
            placeholder="pigeon 4 return time"
            name="fourthPigeonReturnTime"
            size="sm"
            type="time"
            value={resultsForm.fourthPigeonReturnTime}
            onChange={handleFormChange}
          />
        </Form.Group>
        <Form.Group className="w-50">
          <Form.Label className="label-size">pigeon 5 return time</Form.Label>
          <Form.Control
            placeholder="pigeon 5 return time"
            size="sm"
            name="fifthPigeonReturnTime"
            type="time"
            value={resultsForm.fifthPigeonReturnTime}
            onChange={handleFormChange}
          />
        </Form.Group>

        <Form.Group className="w-50">
          <Form.Label className="label-size">pigeon 6 return time</Form.Label>
          <Form.Control
            placeholder="pigeon 6 return time"
            size="sm"
            name="sixthPigeonReturnTime"
            type="time"
            value={resultsForm.sixthPigeonReturnTime}
            onChange={handleFormChange}
          />
        </Form.Group>
        <Form.Group className="w-50">
          <Form.Label className="label-size">pigeon 7 return time</Form.Label>
          <Form.Control
            placeholder="pigeon 7 return time"
            name="seventhPigeonReturnTime"
            size="sm"
            type="time"
            value={resultsForm.seventhPigeonReturnTime}
            onChange={handleFormChange}
          />
        </Form.Group>
        <Form.Group className="w-50">
          <Form.Label className="label-size">Total</Form.Label>
          <Form.Control
            placeholder="total time"
            name="total"
            size="sm"
            type="time"
            value={resultsForm.total}
            onChange={handleFormChange}
          />
        </Form.Group>
        <Button
          className="mt-3"
          variant="outline-primary"
          type="submit"
          disabled={!resultsForm.pigeonOwnerId}
        >
          Submit
        </Button>
        <Toaster />
      </Form>
    </div>
  );
};

export default PigeonResultsForm;
