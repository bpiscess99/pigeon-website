import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const Dashboard = () => {


  const [clubs, setClubs] = useState([]);

  useEffect(() => {
      const fetchClubs = async () => {
          try {
              const response = await axios.get('/api/v1/auth/clubs');
              if (response.data.success) {
                  // Filter clubs to include only those with role 0
                  const filteredClubs = response.data.clubs.filter(club => club.role === 0);
                  setClubs(filteredClubs);
              }
          } catch (error) {
              console.error('Error fetching clubs:', error);
          }
      };

      fetchClubs();
  }, []);

    return (
        
        
        <><div>
  <header id="headers" className="headers  d-flex align-items-center sticky-top">
    <div className="container-fluid container-xl position-relative d-flex align-items-center">
      <a href="/" className="logo d-flex align-items-center me-auto">
        {/* Uncomment the line below if you also wish to use an image logo */}
        {/* <img src="assets/img/logo.png" alt=""> */}
        <h1 className="sitename">Pigeon کبوتر بازی</h1>
      </a>
      <nav id="navmenu" className="navmenu">
        <ul>
          <li><a href="/" className="active">Home<br /></a></li>
          <li><a className="nav-link scrollto" href="#feature">Clubs {clubs.length}</a></li>
          <li><a className="nav-link scrollto" href="#feature">Events</a></li>
          <li><a className="nav-link scrollto" href="/create">Contact</a></li>
        </ul>
        <i className="mobile-nav-toggle d-xl-none bi bi-list" />
      </nav>
      <a className="btn-getstarted" href="/login">Get Started</a>
    </div>
  </header>
  <main className="mains">
    {/* Hero Section */}
    <section >
     <Carousel id="heroCarousel">
       <Carousel.Item>
         <img
           className="d-block w-100"
           src="assets/img/carousel1.jpeg"
           alt="First slide"
           data-aos="fade-in"
         />
       </Carousel.Item>
       <Carousel.Item>
         <img
           className="d-block w-100"
           src="assets/img/carousel2.jpeg"
           alt="Second slide"
           data-aos="fade-in"
         />
       </Carousel.Item>
       <Carousel.Item>
         <img
           className="d-block w-100"
           src="assets/img/carousel3.jpeg"
           alt="Third slide"
           data-aos="fade-in"
         />
       </Carousel.Item>
       <Carousel.Item>
         <img
           className="d-block w-100"
           src="assets/img/carousel4.jpeg"
           alt="Third slide"
           data-aos="fade-in"
         />
       </Carousel.Item>
     </Carousel>
   </section>
    {/* /Hero Section */}
    {/* About Section */}
   
    {/* Features Section */}
  <section id="feature" className="features section">
            <h1 id='ww'>Clubs {clubs.length}</h1>
            <div className="container">
                <div className="row gy-4">
                    {clubs.map((club, index) => (
                        <div className="col-lg-3 col-md-4" data-aos="fade-up" data-aos-delay={(index + 1) * 100} key={club._id}>
                            <div className="features-item">
                            <i className="bi bi-star" style={{color: '#ffa76e'}} />
                                <h3>
                                  <Link to={`/clubdetail/${club.slug}`} className="stretched-link">{club.cname}

                                  </Link>
                                  </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
  </main>
             
  <footer id="footers" className="footers position-relative light-background">
    <div className="container footers-top">
      <div className="row gy-4">
        <div className="col-lg-4 col-md-6 footers-about">
</div>
      </div>
    </div>
    <div className="containers copyright text-center mt-4">
      <p>© <span>Copyright</span> <strong className="px-1 sitename">Pigeon</strong> <span>All Rights Reserved</span></p>
      <div className="credits">
        {/* All the links in the footer should remain intact. */}
        {/* You can delete the links only if you've purchased the pro version. */}
        {/* Licensing information: https://bootstrapmade.com/license/ */}
        {/* Purchase the pro version with working PHP/AJAX contact form: [buy-url] */}
        Designed by <a className='za' href="/">Hami jutt</a>
      </div>
    </div>
  </footer>

</div>
</>
  )
}

export default Dashboard
