import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { Button } from "react-bootstrap";
import ClubsContext from "./Contexts/ClubsContext";

const Createclub = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [cname, setcName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setClubs } = useContext(ClubsContext);

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/auth/register",
        {
          email,
          name,
          cname,
          password,
          role: 0,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setTimeout(() => {
          navigate("/clubs");
          setClubs((prev) => {
            return [...prev, res.data.user];
          });
        }, 3000);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Something Went wrong");
    }
  };

  return (
    <div
      id="zooma"
      className="d-flex py-5 justify-content-center align-items-center"
    >
      <div className="card my-2 w-25">
        <div>
          <div className="d-flex justify-content-center flex-column align-items-center">
            <h5 className="card-title">Create Club</h5>
          </div>
          <form
            onSubmit={handlesubmit}
            className="d-flex justify-content-start px-3 gap-2 flex-column align-items-center needs-validation"
          >
            <div className="w-100">
              <div className="star">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  name="name"
                  className="aaq form-control"
                  id="yourName"
                  required
                  placeholder="Enter Your Name"
                />
              </div>
            </div>
            <div className="w-100">
              <input
                type="text"
                value={cname}
                onChange={(e) => setcName(e.target.value)}
                name="cname"
                className="aaq form-control"
                id="yourClub"
                required
                placeholder="Enter Your Club"
              />
              <div className="invalid-feedback">Please, enter your Club!</div>
            </div>
            <div className="w-100">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                className="aaq form-control"
                id="yourEmail"
                required
                placeholder="Enter Your Email"
              />
              <div className="invalid-feedback">
                Please enter a valid Email address!
              </div>
            </div>
            <div className="w-100">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                className="aaq form-control"
                id="yourPassword"
                required
                placeholder="Enter Your Password"
              />
              <div className="invalid-feedback">
                Please enter your password!
              </div>
            </div>

            <Button size="sm" variant="outline-info" type="submit">
              Create Club
            </Button>
            <Toaster />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Createclub;
