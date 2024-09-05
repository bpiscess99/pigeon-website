import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Carousel, Image, Tab } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Select, Tag } from "antd";
import toast from "react-hot-toast";
import TournamentContext from "./Contexts/TournamentContext";
import ClubsContext from "./Contexts/ClubsContext";

const Dashboard = () => {
  const { clubs } = useContext(ClubsContext);
  const [results, setResults] = useState([]);
  const { tournaments } = useContext(TournamentContext);
  const [tournament, setTournament] = useState({});
  const [images, setImages] = useState([]);

  const fetchResults = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/pigeonOwners/:${id}`
      );
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
  }, []);

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
                className="border rounded border-warning  px-3 pt-2"
                key={index}
              >
                <p>
                  <Link
                    style={{
                      textDecoration: "none",
                      fontWeight: "bold",
                      color: "#E85C0D",
                      // width: "100px",
                    }}
                    to={`/club/${club.slug}/tournaments`}
                  >
                    {club.cname}
                  </Link>
                </p>
              </div>
            ))}
          </div>

          <div className="d-flex py-3 justify-content-center align-items-center flex-column">
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
              <div>
                <h5 style={{ marginTop: "7px" }}>
                  {tournament.tournamentName}
                </h5>
                <span style={{ marginLeft: "7px" }}>
                  - Start Time :{tournament.startTime}{" "}
                </span>
              </div>
              <div>
                <p className="lead">
                  Total Pigeons: {tournament.numberOfPigeons}, helper pigeons :
                  <strong> {tournament.helperPigeons} </strong> Is live :{" "}
                  <Tag color="blue"> {tournament.status_} </Tag>,{" "}
                </p>
              </div>
            </div>
            <table className="results-table">
              <thead>
                <tr>
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
              <tbody>
                {results.length > 0 ? (
                  results.map((result, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{result.name}</td>
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
      <footer
        id="footers"
        className="footers position-relative light-background"
      >
        <div className="container footers-top">
          <div className="row gy-4">
            <div className="col-lg-4 col-md-6 footers-about"></div>
          </div>
        </div>
        <div className="containers copyright text-center mt-4">
          <p>
            © <span>Copyright</span>{" "}
            <strong className="px-1 sitename">Pigeon</strong>{" "}
            <span>All Rights Reserved</span>
          </p>
          <div className="credits">
            Designed by{" "}
            <a className="za" href="/">
              Hami jutt
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Dashboard;

// "import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { Carousel } from 'react-bootstrap';

// const CarosuelImage = () => {
//   const [images, setImages] = useState([])

//   useEffect(() => {
//     const fetchImages = async() => {
//         try {
//             const response = await axios.get(/api/images)
//             setImages(response.data);
//             console.log("response:", response.data)
//         } catch (error) {
//             console.log("fetchImages", error)
//         }
//     }
//     fetchImages()
//   }, [])

//   return (

//   );
// };

// export default CarosuelImage
// """

// <div id="carouselExample" className="carousel slide">

//     </div>
