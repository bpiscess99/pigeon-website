import React from "react";

import { Tag, TimePicker } from "antd";
import axios from "axios";

import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useLocation, useNavigate } from "react-router-dom";
dayjs.extend(customParseFormat);

const PigeonOwnerResultUpdate = () => {
  const { owner } = useLocation().state;
  const [updateOwner, setUpdateOwner] = useState(owner);
  const slug = JSON.parse(localStorage.getItem("user")).slug;
  const navigate = useNavigate();
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setUpdateOwner((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const {
      totalPigeons,
      firstPigeonReturnTime,
      secondPigeonReturnTime,
      thirdPigeonReturnTime,
      fourthPigeonReturnTime,
      fifthPigeonReturnTime,
      sixthPigeonReturnTime,
      seventhPigeonReturnTime,
      total,
    } = updateOwner.pigeonsResults;
    const update = {
      pigeonOwnerId: updateOwner._id,
      totalPigeons,
      firstPigeonReturnTime,
      secondPigeonReturnTime,
      thirdPigeonReturnTime,
      fourthPigeonReturnTime,
      fifthPigeonReturnTime,
      sixthPigeonReturnTime,
      seventhPigeonReturnTime,
      total,
    };
    try {
      const response = await axios.patch(
        "http://localhost:8080/api/v1/createResults/",
        update
      );
      console.log(response);
      if (response.status === 200) {
        toast.success(response.data.msg);
        setTimeout(() => {
          navigate(`/club/${slug}/pigeonOwners`);
        }, 3000);
      }
    } catch (error) {
      console.log(error.response.data);
      toast.error(error.response.data.message);
    }
  };

  console.log(owner);

  return (
    <div>
      <h5 className="ps-3">
        Pigeon Owner - <Tag color="lightblue">{owner && owner.name}</Tag>
      </h5>
      <Form
        className="p-3 d-flex gap-2 flex-column align-items-start"
        onSubmit={handleFormSubmit}
      >
        <Form.Group className="w-50">
          <Form.Label className="label-size">Total Pigeons </Form.Label>
          <Form.Control
            size="sm"
            placeholder="total no Pigeons"
            name="totalPigeons"
            type="number"
            value={updateOwner.pigeonsResults.totalPigeons}
            onChange={handleFormChange}
          />
        </Form.Group>
        <div className="d-flex gap-2 w-75">
          <label>#1 Pigeon</label>
          <TimePicker
            name="firstPigeonReturnTime"
            placeholder="#1 Pigeon"
            className="w-25"
            format="HH:mm:ss"
            value={
              updateOwner.pigeonsResults.fifthPigeonReturnTime
                ? dayjs(
                    updateOwner.pigeonsResults.fifthPigeonReturnTime,
                    "HH:mm:ss"
                  )
                : null
            }
            onChange={(time, timeString) =>
              setUpdateOwner((prev) => {
                return {
                  ...prev,
                  pigeonsResults: {
                    ...prev.pigeonsResults,
                    firstPigeonReturnTime: timeString,
                  },
                };
              })
            }
            defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
          />
        </div>
        <div className="d-flex gap-2 w-75">
          <label>#2 Pigeon</label>
          <TimePicker
            name="secondPigeonReturnTime"
            placeholder="#2 Pigeon"
            className="w-25"
            value={
              updateOwner.pigeonsResults.secondPigeonReturnTime
                ? dayjs(
                    updateOwner.pigeonsResults.secondPigeonReturnTime,
                    "HH:mm:ss"
                  )
                : null
            }
            onChange={(time, timeString) =>
              setUpdateOwner((prev) => {
                return {
                  ...prev,
                  pigeonsResults: {
                    ...prev.pigeonsResults,
                    secondPigeonReturnTime: timeString,
                  },
                };
              })
            }
            defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
          />
        </div>
        <div className="d-flex gap-2 w-75">
          <label>#3 Pigeon</label>
          <TimePicker
            name="thirdPigeonReturnTime"
            placeholder="#3 Pigeon"
            className="w-25"
            value={
              updateOwner.pigeonsResults.thirdPigeonReturnTime
                ? dayjs(
                    updateOwner.pigeonsResults.thirdPigeonReturnTime,
                    "HH:mm:ss"
                  )
                : null
            }
            onChange={(time, timeString) =>
              setUpdateOwner((prev) => {
                return {
                  ...prev,
                  pigeonsResults: {
                    ...prev.pigeonsResults,
                    thirdPigeonReturnTime: timeString,
                  },
                };
              })
            }
            defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
          />
        </div>
        <div className="d-flex gap-2 w-75">
          <label>#4 Pigeon</label>
          <TimePicker
            name="fourthPigeonReturnTime"
            placeholder="#4 Pigeon"
            className="w-25"
            value={
              updateOwner.pigeonsResults.fourthPigeonReturnTime
                ? dayjs(
                    updateOwner.pigeonsResults.fourthPigeonReturnTime,
                    "HH:mm:ss"
                  )
                : null
            }
            onChange={(time, timeString) =>
              setUpdateOwner((prev) => {
                return {
                  ...prev,
                  pigeonsResults: {
                    ...prev.pigeonsResults,
                    fourthPigeonReturnTime: timeString,
                  },
                };
              })
            }
            defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
          />
        </div>
        <div className="d-flex gap-2 w-75">
          <label>#5 Pigeon</label>
          <TimePicker
            name="fifthPigeonReturnTime"
            placeholder="#5 Pigeon"
            className="w-25"
            value={
              updateOwner.pigeonsResults.fifthPigeonReturnTime
                ? dayjs(
                    updateOwner.pigeonsResults.fifthPigeonReturnTime,
                    "HH:mm:ss"
                  )
                : null
            }
            onChange={(time, timeString) =>
              setUpdateOwner((prev) => {
                return {
                  ...prev,
                  pigeonsResults: {
                    ...prev.pigeonsResults,
                    fifthPigeonReturnTime: timeString,
                  },
                };
              })
            }
            defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
          />
        </div>
        <div className="d-flex gap-2 w-75">
          <label>#6 Pigeon</label>
          <TimePicker
            name="sixthPigeonReturnTime"
            placeholder="#6 Pigeon"
            className="w-25"
            value={
              updateOwner.pigeonsResults.sixthPigeonReturnTime
                ? dayjs(
                    updateOwner.pigeonsResults.sixthPigeonReturnTime,
                    "HH:mm:ss"
                  )
                : null
            }
            onChange={(time, timeString) =>
              setUpdateOwner((prev) => {
                return {
                  ...prev,
                  pigeonsResults: {
                    ...prev.pigeonsResults,
                    sixthPigeonReturnTime: timeString,
                  },
                };
              })
            }
            defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
          />
        </div>
        <div className="d-flex gap-2 w-75">
          <label>#7 Pigeon</label>
          <TimePicker
            name="seventhPigeonReturnTime"
            placeholder="#7 Pigeon"
            className="w-25"
            value={
              updateOwner.pigeonsResults.seventhPigeonReturnTime
                ? dayjs(
                    updateOwner.pigeonsResults.seventhPigeonReturnTime,
                    "HH:mm:ss"
                  )
                : null
            }
            onChange={(time, timeString) =>
              setUpdateOwner((prev) => {
                return {
                  ...prev,
                  pigeonsResults: {
                    ...prev.pigeonsResults,
                    seventhPigeonReturnTime: timeString,
                  },
                };
              })
            }
            defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
          />
        </div>
        <div className="d-flex gap-2 w-75">
          <label>Total Time</label>
          <TimePicker
            name="total"
            placeholder="Total Time"
            className="w-25"
            value={
              updateOwner.pigeonsResults.total
                ? dayjs(updateOwner.pigeonsResults.total, "HH:mm:ss")
                : null
            }
            onChange={(time, timeString) =>
              setUpdateOwner((prev) => {
                return {
                  ...prev,
                  pigeonsResults: {
                    ...prev.pigeonsResults,
                    total: timeString,
                  },
                };
              })
            }
            defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
          />
        </div>
        <Button
          className="w-25 mt-3"
          variant="outline-primary"
          type="submit"
          size="sm"
        >
          Submit
        </Button>
        <Toaster />
      </Form>
    </div>
  );
};

export default PigeonOwnerResultUpdate;
