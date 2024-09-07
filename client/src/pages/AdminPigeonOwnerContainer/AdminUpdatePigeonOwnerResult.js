import React from "react";

import { Breadcrumb, Tag, TimePicker } from "antd";
import axios from "axios";

import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
dayjs.extend(customParseFormat);

const AdminUpdatePigeonOwnerResult = () => {
  const { owner } = useLocation().state;
  const [updateOwner, setUpdateOwner] = useState(owner);
  const navigate = useNavigate();
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    setUpdateOwner((prevState) => {
      return {
        ...prevState,
        pigeonsResults: {
          ...prevState.pigeonsResults,
          [name]: value,
        },
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
          navigate(`/pigeonOwners`);
        }, 3000);
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
        className="px-4 py-2"
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
                to={`/pigeonOwners`}
              >
                Pigeon Owners
              </NavLink>
            ),
          },
          {
            title: (
              <p
                style={{
                  backgroundColor: "#ffa76e",
                  borderRadius: "5px",
                  padding: "0px 4px",
                }}
                className={"text-decoration-none"}
              >
                Pigeon Owner Update
              </p>
            ),
          },
        ]}
      />

      <div className="d-flex justify-content-center align-items-center flex-column">
        <h5 className="ps-3">Update Pigeon Results</h5>
        <Form
          className="px-3 pb-3 d-flex gap-2 flex-column align-items-center"
          onSubmit={handleFormSubmit}
        >
          <Form.Group className="d-flex gap-2">
            <label className="label-size">Total Pigeons </label>
            <Form.Control
              size="sm"
              placeholder="total no Pigeons"
              // className="px-5"
              name="totalPigeons"
              type="number"
              value={updateOwner.pigeonsResults.totalPigeons}
              onChange={handleFormChange}
            />
          </Form.Group>
          <div className="d-flex gap-2 ">
            <label>#1 Pigeon</label>
            <TimePicker
              name="firstPigeonReturnTime"
              placeholder="#1 Pigeon"
              // className="w-25"
              className="px-5"
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
          <div className="d-flex gap-2 ">
            <label>#2 Pigeon</label>
            <TimePicker
              name="secondPigeonReturnTime"
              placeholder="#2 Pigeon"
              // className="w-25"
              className="px-5"
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
          <div className="d-flex gap-2 ">
            <label>#3 Pigeon</label>
            <TimePicker
              name="thirdPigeonReturnTime"
              placeholder="#3 Pigeon"
              // className="w-25"
              className="px-5"
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
          <div className="d-flex gap-2">
            <label>#4 Pigeon</label>
            <TimePicker
              name="fourthPigeonReturnTime"
              placeholder="#4 Pigeon"
              // className="w-25"

              className="px-5"
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
          <div className="d-flex gap-2">
            <label>#5 Pigeon</label>
            <TimePicker
              name="fifthPigeonReturnTime"
              placeholder="#5 Pigeon"
              // className="w-25"
              className="px-5"
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
          <div className="d-flex gap-2 ">
            <label>#6 Pigeon</label>
            <TimePicker
              name="sixthPigeonReturnTime"
              placeholder="#6 Pigeon"
              // className="w-25"
              className="px-5"
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
          <div className="d-flex gap-2 ">
            <label>#7 Pigeon</label>
            <TimePicker
              name="seventhPigeonReturnTime"
              placeholder="#7 Pigeon"
              // className="w-25"
              className="px-5"
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
          <div className="d-flex gap-2 ">
            <label>Total Time</label>
            <TimePicker
              name="total"
              placeholder="Total Time"
              className="px-5"
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
            className="px-5 mt-3"
            variant="outline-primary"
            type="submit"
            size="sm"
          >
            Submit
          </Button>
          <Toaster />
        </Form>
      </div>
    </>
  );
};

export default AdminUpdatePigeonOwnerResult;
