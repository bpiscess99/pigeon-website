import { Breadcrumb, TimePicker } from "antd";
import axios from "axios";
import React, { useEffect } from "react";

import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import toast, { Toaster } from "react-hot-toast";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import duration from "dayjs/plugin/duration"; // Import the correct duration plugin

import { NavLink, useLocation, useNavigate } from "react-router-dom";
dayjs.extend(customParseFormat);
dayjs.extend(duration); // Extend the duration plugin

const AdminAddPigeonOwnerResult = () => {
  const { owner } = useLocation().state;
  const [resultsForm, setResultsForm] = useState({
    pigeonOwnerId: owner && owner._id,
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
  const [startTime, setStartTime] = useState("");
  const slug = JSON.parse(localStorage.getItem("user")).slug;
  const navigate = useNavigate();
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setResultsForm((prevResultsForm) => {
      return {
        ...prevResultsForm,
        [name]: value,
      };
    });
  };

  const calculateTotalTime = () => {
    const times = [
      resultsForm.firstPigeonReturnTime,
      resultsForm.secondPigeonReturnTime,
      resultsForm.thirdPigeonReturnTime,
      resultsForm.fourthPigeonReturnTime,
      resultsForm.fifthPigeonReturnTime,
      resultsForm.sixthPigeonReturnTime,
      resultsForm.seventhPigeonReturnTime,
    ];
    let totalTime = 0;
    times.forEach((timeString) => {
      if (timeString) {
        const time = dayjs(startTime, "HH:mm:ss");
        const returnTime = dayjs(timeString, "HH:mm:ss");
        const timeDifference = returnTime.diff(time, "second"); // Difference in seconds
        totalTime += timeDifference;
      }
    });

    const totalDuration = dayjs
      .duration(totalTime, "seconds")
      .format("HH:mm:ss");

    return totalDuration;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        "http://localhost:8080/api/v1/createResults/",
        resultsForm
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

  const fetchStartTime = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1//pigeonOwners/getPigeonOwnerTournament/:${owner._id}`
      );
      console.log(response);

      if (response.data.success) {
        setStartTime(response.data.startTime);
      }
    } catch (error) {
      console.error("Error fetching clubs:", error);
    }
  };
  // useEffect(() => {
  //   const totalTime = calculateTotalTime();
  //   setResultsForm((prevResultsForm) => {
  //     return {
  //       ...prevResultsForm,
  //       total: totalTime,
  //     };
  //   });
  // }, [resultsForm]);

  //   useEffect(() => {
  //     // fetchStartTime();
  //   });
  return (
    <>
      <Breadcrumb
        style={{ color: "#ffa76e" }}
        className="px-5 pb-2"
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
                // style={{ color: "#ffa76e", fontWeight: "bolder" }}
                className={"text-decoration-none"}
                style={{
                  backgroundColor: "#ffa76e",
                  borderRadius: "5px",
                  padding: "0px 4px",
                }}
              >
                Add Pigeon Result
              </p>
            ),
          },
        ]}
      />
      <div className="d-flex flex-column align-items-center justify-content-center">
        <h5 className="ps-3">Add Pigeon Results</h5>
        <Form
          className="p-3 d-flex gap-2 flex-column align-items-center"
          onSubmit={handleFormSubmit}
        >
          <Form.Group className="d-flex gap-2">
            <label className="label-size">Total Pigeons </label>
            <Form.Control
              size="sm"
              placeholder="total no Pigeons"
              name="totalPigeons"
              type="number"
              value={resultsForm.totalPigeons}
              onChange={handleFormChange}
            />
          </Form.Group>
          <div className="d-flex gap-2">
            <label>#1 Pigeon</label>
            <TimePicker
              name="firstPigeonReturnTime"
              placeholder="#1 Pigeon"
              className="px-5"
              onChange={(time, timeString) =>
                setResultsForm((prev) => {
                  return {
                    ...prev,
                    firstPigeonReturnTime: timeString,
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
              className="px-5"
              onChange={(time, timeString) =>
                setResultsForm((prev) => {
                  return {
                    ...prev,
                    secondPigeonReturnTime: timeString,
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
              className="px-5"
              onChange={(time, timeString) =>
                setResultsForm((prev) => {
                  return {
                    ...prev,
                    thirdPigeonReturnTime: timeString,
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
              className="px-5"
              onChange={(time, timeString) =>
                setResultsForm((prev) => {
                  return {
                    ...prev,
                    fourthPigeonReturnTime: timeString,
                  };
                })
              }
              defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
            />
          </div>
          <div className="d-flex gap-2 ">
            <label>#5 Pigeon</label>
            <TimePicker
              name="fifthPigeonReturnTime"
              placeholder="#5 Pigeon"
              className="px-5"
              onChange={(time, timeString) =>
                setResultsForm((prev) => {
                  return {
                    ...prev,
                    fifthPigeonReturnTime: timeString,
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
              className="px-5"
              onChange={(time, timeString) =>
                setResultsForm((prev) => {
                  return {
                    ...prev,
                    sixthPigeonReturnTime: timeString,
                  };
                })
              }
              defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
            />
          </div>
          <div className="d-flex gap-2">
            <label>#7 Pigeon</label>
            <TimePicker
              name="seventhPigeonReturnTime"
              placeholder="#7 Pigeon"
              className="px-5"
              onChange={(time, timeString) =>
                setResultsForm((prev) => {
                  return {
                    ...prev,
                    seventhPigeonReturnTime: timeString,
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
              onChange={(time, timeString) =>
                setResultsForm((prev) => {
                  return {
                    ...prev,
                    total: timeString,
                  };
                })
              }
              defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
            />
          </div>
          <Button
            className=" mt-3"
            variant="outline-primary"
            type="submit"
            size="sm"
            disabled={!resultsForm.pigeonOwnerId}
          >
            Submit
          </Button>
          <Toaster />
        </Form>
      </div>
    </>
  );
};

export default AdminAddPigeonOwnerResult;
