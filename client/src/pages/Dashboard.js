import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Button, Carousel, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Select, Tag } from "antd";
import toast from "react-hot-toast";
import TournamentContext from "./Contexts/TournamentContext";
import ClubsContext from "./Contexts/ClubsContext";
import Footer from "./components/Footer";

const Dashboard = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const { clubs } = useContext(ClubsContext);
  const [results, setResults] = useState([]);
  const { tournaments, fetchTournaments } = useContext(TournamentContext);
  const [tournament, setTournament] = useState({});
  const [images, setImages] = useState([]);
  const [ownerWithLatestTime, setOwnerWithLatestTime] = useState({});
  const navigate = useNavigate();

  const timeToSeconds = (timeStr) => {
    const [hours, minutes, seconds] = timeStr.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  };

  // Function to calculate the last return time (latest) from all pigeon owners

  // Function to calculate the last return time (latest) from all pigeon owners
  const getLastReturnTime = (results) => {
    let latestTimeInSeconds = 0; // Store the latest time in seconds
    let ownerWithLatestTime = {}; // Object to store the owner details with the latest return time

    results.forEach((owner, index) => {
      const { pigeonsResults } = owner;

      // Extract return times for each pigeon
      const returnTimes = [
        pigeonsResults.firstPigeonReturnTime,
        pigeonsResults.secondPigeonReturnTime,
        pigeonsResults.thirdPigeonReturnTime,
        pigeonsResults.fourthPigeonReturnTime,
        pigeonsResults.fifthPigeonReturnTime,
        pigeonsResults.sixthPigeonReturnTime,
        pigeonsResults.seventhPigeonReturnTime,
      ];

      // Convert return times to seconds and filter out any undefined/null times
      const validReturnTimesInSeconds = returnTimes
        .filter((time) => time) // Remove any null/undefined times
        .map(timeToSeconds);

      // Find the latest return time for this owner
      const ownerLatestTime = Math.max(...validReturnTimesInSeconds);

      // Update the overall latest time if the owner's time is greater
      if (ownerLatestTime > latestTimeInSeconds) {
        latestTimeInSeconds = ownerLatestTime;
        ownerWithLatestTime = {
          name: owner.name, // Pigeon owner's name
          owner: owner,
        };
      }
    });

    // Convert the latest time back to hours, minutes, and seconds format
    const hours = Math.floor(latestTimeInSeconds / 3600);
    const minutes = Math.floor((latestTimeInSeconds % 3600) / 60);
    const seconds = latestTimeInSeconds % 60;

    // Return the owner details and the formatted latest time
    setOwnerWithLatestTime({
      latestTime: `${hours}:${minutes}:${seconds}`,
      ownerWithLatestTime,
    });
  };

  const fetchResults = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/pigeonOwners/:${id}`
      );
      getLastReturnTime(response.data.pigeonOwners);

      setResults(response.data.pigeonOwners);
    } catch (error) {
      console.error("Error fetching clubs:", error);
    }
  };

  const handleTournamentChange = async (tournament) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/tournaments/:${tournament}`
      );
      setTournament(response.data.tournament);

      fetchResults(tournament);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  const fetchImages = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/images");
      setImages(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchImages();
    fetchTournaments();
  }, []);
  console.log(ownerWithLatestTime);

  return (
    <>
      <div>
        {/* <header
          id="headers"
          className="headers  d-flex align-items-center sticky-top"
        >
          <div className="container-fluid container-xl position-relative d-flex align-items-center">
            <a href="/" className="logo d-flex align-items-center me-auto">

              <h1 className="sitename">Pigeon کبوتر بازی</h1>
            </a>
            <nav id="navmenu" className="navmenu">
              <ul>
                <li>
                  <a href="/" className="active">
                    Home
                    <br />
                  </a>
                </li>
                <li>
                  <a className="nav-link scrollto" href="#feature">
                    Clubs
                  </a>
                </li>
                <li>
                  <a className="nav-link scrollto" href="#feature">
                    Tournaments
                  </a>
                </li>
                <li>
                  <NavLink className="nav-link scrollto" to="/login">
                    Contact
                  </NavLink>
                </li>
              </ul>
              <i className="mobile-nav-toggle d-xl-none bi bi-list" />
            </nav>
            <a className="btn-getstarted" href="/login">
              Login
            </a>
          </div>
        </header> */}
        <main className="main">
          <Carousel interval={2000} className="carousel-inner">
            {images.map((image, index) => (
              <Carousel.Item key={index}>
                <img
                  src={`http://localhost:8080/uploads/${image.imageUrl}`}
                  className="d-block w-100"
                  alt="carousel"
                  style={{ width: "100vw", height: "50vh" }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
          <div className="d-flex gap-1 py-2 justify-content-center flex-wrap align-items-center">
            {clubs.map((club, index) => (
              <div
                className="rounded px-3 py-1"
                style={{ border: "2px solid #E85C0D " }}
                key={index}
              >
                <Link
                  style={{
                    textDecoration: "none",
                    fontWeight: "600",
                    color: "#E85C0D",
                  }}
                  to={`/cl`}
                  state={{ id: club._id }}
                >
                  {club.cname}
                </Link>
              </div>
            ))}
          </div>

          <div className="d-flex py-3 px-2 justify-content-center align-items-center flex-column">
            <div className="px-3">
              <div className=" me-3 d-flex align-items-center gap-3">
                <Select
                  className="w-100"
                  type="text"
                  name="tournament"
                  size="large"
                  placeholder="Select Tournament"
                  onChange={handleTournamentChange}
                >
                  <Select.Option></Select.Option>
                  {tournaments &&
                    tournaments.map((_, index) => {
                      return (
                        <Select.Option key={index} value={_._id}>
                          {_.tournamentName}
                        </Select.Option>
                      );
                    })}
                </Select>
              </div>
              <div className="d-flex pt-2 justify-content-center align-items-center">
                <h4 style={{ marginTop: "7px" }}>
                  {tournament.tournamentName} - Start Time{" "}
                  {tournament.startTime}{" "}
                </h4>
              </div>
              <div>
                <h5>
                  Participating Lofts:{tournament?.pigeonOwners?.length}, Total
                  Pigeons:{tournament.numberOfPigeons}, Landed Pigeons:{" "}
                  {tournament.landedPigeons}, Remaining Pigeons:{" "}
                  {tournament.numberOfPigeons &&
                    tournament.numberOfPigeons - tournament.landedPigeons}
                  , Is live : <Tag color="blue"> {tournament.status_} </Tag>
                </h5>
                <h5>
                  Today's winner pigeon time:{" "}
                  {ownerWithLatestTime &&
                    ownerWithLatestTime?.ownerWithLatestTime?.name}{" "}
                  -
                  <h4 className="d-inline">
                    <div className="badge bg-primary">
                      {ownerWithLatestTime && ownerWithLatestTime.latestTime}
                    </div>
                  </h4>
                </h5>
              </div>
            </div>
            <table className="results-table">
              <thead>
                <tr className="text-center">
                  <th>Sr No.</th>
                  <th>Pigeon Owner</th>
                  <th>No of Pigeons</th>
                  <th>#1</th>
                  <th>#2</th>
                  <th>#3</th>
                  <th>#4</th>
                  <th>#5</th>
                  <th>#6</th>
                  <th>#7</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {results.length > 0 ? (
                  results.map((result, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td className="d-flex align-items-center justify-content-start gap-2">
                        {result.image ? (
                          <Image
                            className="rounded"
                            src={`http://localhost:8080/uploads/${result.image}`}
                            width="40"
                            height="40"
                          />
                        ) : (
                          <Image
                            className="rounded"
                            src={`/person.png`}
                            width="40"
                            height="40"
                          />
                        )}
                        {result.name}
                      </td>
                      {result.pigeonsResults && (
                        <>
                          <td>{result.pigeonsResults.totalPigeons}</td>
                          <td>{result.pigeonsResults.firstPigeonReturnTime}</td>
                          <td>
                            {result.pigeonsResults.secondPigeonReturnTime}
                          </td>
                          <td>{result.pigeonsResults.thirdPigeonReturnTime}</td>
                          <td>
                            {result.pigeonsResults.fourthPigeonReturnTime}
                          </td>
                          <td>{result.pigeonsResults.fifthPigeonReturnTime}</td>
                          <td>{result.pigeonsResults.sixthPigeonReturnTime}</td>
                          <td>
                            {result.pigeonsResults.seventhPigeonReturnTime}
                          </td>
                          <td>
                            <Tag color="orange">
                              {result.pigeonsResults.total}
                            </Tag>
                          </td>
                        </>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={11}>
                      <Image src="/empty.png" alt="empty_img" />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>{" "}
          </div>
        </main>
      </div>
      <div className="d-flex  justify-content-end align-items-center">
        {!token ? (
          <Button
            className="mx-2 px-3"
            variant="outline-dark"
            size="sm"
            onClick={() => {
              navigate("/login");
            }}
          >
            Login
          </Button>
        ) : (
          <Button
            className="mx-2 px-3"
            variant="outline-dark"
            size="sm"
            onClick={() => {
              user.role === 1 && navigate("/dashboard");
              user.role === 0 && navigate(`/club/:${user.slug}/`);
            }}
          >
            Dashboard
          </Button>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
