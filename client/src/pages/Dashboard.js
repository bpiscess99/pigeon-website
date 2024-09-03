import React, { useState, useEffect } from "react";
import axios from "axios";
import { Carousel, Tab } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { Select, Tag } from "antd";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [clubs, setClubs] = useState([]);
  const [results, setResults] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [tournament, setTournament] = useState({});

  const fetchClubs = async () => {
    try {
      const response = await axios.get("/api/v1/auth/clubs");
      if (response.data.success) {
        // Filter clubs to include only those with role 0
        const filteredClubs = response.data.clubs.filter(
          (club) => club.role === 0
        );
        setClubs(filteredClubs);
      }
    } catch (error) {
      console.error("Error fetching clubs:", error);
    }
  };

  const fetchResults = async () => {
    try {
      const response = await axios.get("/api/v1/allowners");
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching clubs:", error);
    }
  };

  useEffect(() => {
    fetchClubs();
    fetchResults();
    fetchTournaments();
  }, []);

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
  const handleTournamentChange = async (tournament) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/tournaments/:${tournament}`
      );
      setTournament(response.data.tournament);
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  return (
    <>
      <div>
        <header
          id="headers"
          className="headers  d-flex align-items-center sticky-top"
        >
          <div className="container-fluid container-xl position-relative d-flex align-items-center">
            <a href="/" className="logo d-flex align-items-center me-auto">
              {/* Uncomment the line below if you also wish to use an image logo */}
              {/* <img src="assets/img/logo.png" alt=""> */}
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
        </header>
        <main className="main">
          <Carousel interval={2000} id="heroCarousel">
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/1.jpg"
                alt="First slide"
                data-aos="fade-in"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/2.jpg"
                alt="Second slide"
                data-aos="fade-in"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="/3.jpg"
                alt="Third slide"
                data-aos="fade-in"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="4.jpg"
                alt="Fourth slide"
                data-aos="fade-in"
              />
            </Carousel.Item>
          </Carousel>
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
                  <th>Name</th>
                  <th>Pigeons</th>
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
                {results.map((result, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{result.name}</td>
                    {result.pigeonsResults && (
                      <>
                        <td>{result.pigeonsResults.totalPigeons}</td>
                        <td>{result.pigeonsResults.firstPigeonReturnTime}</td>
                        <td>{result.pigeonsResults.secondPigeonReturnTime}</td>
                        <td>{result.pigeonsResults.thirdPigeonReturnTime}</td>
                        <td>{result.pigeonsResults.fourthPigeonReturnTime}</td>
                        <td>{result.pigeonsResults.fifthPigeonReturnTime}</td>
                        <td>{result.pigeonsResults.sixthPigeonReturnTime}</td>
                        <td>{result.pigeonsResults.seventhPigeonReturnTime}</td>
                        <td>
                          <Tag color="orange">
                            {result.pigeonsResults.total}
                          </Tag>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>{" "}
          </div>

          {/* Features Section */}
          <section id="feature" className="features section">
            <div className="d-flex justify-content-evenly">
              <h1 id="ww">Clubs</h1>
              <h1 id="ww"> Total{` {${clubs.length}}`}</h1>
            </div>
            <div className="container">
              <div className="row gy-4">
                {clubs.map((club, index) => (
                  <div
                    className="col-lg-3 col-md-4"
                    data-aos="fade-up"
                    data-aos-delay={(index + 1) * 100}
                    key={club._id}
                  >
                    <div className="features-item">
                      <i className="bi bi-star" style={{ color: "#ffa76e" }} />
                      <h3>
                        <Link
                          to={`/club/${club.slug}/tournaments`}
                          className="stretched-link"
                        >
                          {club.cname}
                        </Link>
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

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
              {/* All the links in the footer should remain intact. */}
              {/* You can delete the links only if you've purchased the pro version. */}
              {/* Licensing information: https://bootstrapmade.com/license/ */}
              {/* Purchase the pro version with working PHP/AJAX contact form: [buy-url] */}
              Designed by{" "}
              <a className="za" href="/">
                Hami jutt
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Dashboard;
