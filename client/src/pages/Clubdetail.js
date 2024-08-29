import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {  Link } from 'react-router-dom';
import axios from 'axios';

const Clubdetail = () => {

    const handleSidebarToggle = () => {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('active');
      };



    // =========================================================================
    
      // Define the nav items with multiple links and nested collapsible links
      const navItems = [
        
        
        
        {
            id: 3,
            title: 'LOGOUT',
            icon: "bi bi-box-arrow-right",
            links: [], // No sub-links, so this will render as a single link
            to: '/',
          },
     
      ];
        // Add more nav items as needed
      
      // Initialize state to keep track of collapsed items
      const [collapsedItems, setCollapsedItems] = useState(navItems.map(() => false));
      const [collapsedSubItems, setCollapsedSubItems] = useState(navItems.map(item => item.links.map(() => false)));
      
      // Toggle function for collapse state of main items
      const handleCollapse = (index) => {
        setCollapsedItems(collapsedItems.map((item, i) => (i === index ? !item : item)));
      };
      
      // Toggle function for collapse state of sub-items
      const handleSubCollapse = (itemIndex, subIndex) => {
        setCollapsedSubItems(collapsedSubItems.map((subItems, i) => 
          i === itemIndex 
            ? subItems.map((subItem, j) => (j === subIndex ? !subItem : subItem)) 
            : subItems
        ));
      };
      
    // ================================================================



    const { slug } = useParams();
    const [club, setClub] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClubDetails = async () => {
            try {
                const response = await axios.get(`/api/v1/auth/clubs/${slug}`);
                setClub(response.data.club);
            } catch (error) {
                setError('Error fetching club details');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchClubDetails();
    }, [slug]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>

            
        <div>
        <header id="header" className="header fixed-top d-flex align-items-center">
        <div className="d-flex align-items-center justify-content-between">
          <Link className="logo d-flex align-items-center">
          
            <span className="zz d-none d-lg-block">Pigeon</span>
          </Link>
          <button id="toggle-sidebar-btn" className="bi bi-list toggle-sidebar-btn" onClick={handleSidebarToggle} />
        </div>{/* End Logo */}
        <div className="search-bar">
          <form className="search-form d-flex align-items-center" >
            <input type="text"  placeholder="Search" title="Enter search keyword" />
            <button type="submit" title="Search"><i className="bi bi-search" /></button>
          </form>
        </div>{/* End Search Bar */}
        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
            <li className="nav-item d-block d-lg-none">
              <a className="nav-link nav-icon search-bar-toggle " href="/">
                <i className="bi bi-search" />
              </a>
            </li>{/* End Search Icon*/}
            
            
            <li className="nav-item dropdown pe-3">
              <Link className="nav-link nav-profile d-flex align-items-center pe-0"  >
                
                <span className="d-none d-md-block  ps-2">Welcome {club.name}</span>
              </Link>{/* End Profile Iamge Icon */}
    
            </li>{/* End Profile Nav */}
          </ul>
        </nav>{/* End Icons Navigation */}
      </header>{/* End Header */}
 {/* ======= Sidebar ======= */}
 <aside id="sidebar" className="sidebar" data-background-color="dark">
    <ul className="sidebar-nav" id="sidebar-nav">
      <li className="nav-item">
        <a className="nav-link " href="/">
          <i className="bi bi-grid" />
          <span>Dashboard</span>
        </a>
      </li>{/* End Dashboard Nav */}

{/* ======================================================================================= */}

{navItems.map((item, index) => (
      <li className="nav-item" key={item.id}>
        {item.links.length > 0 ? (
          <>
            <Link 
              className="nav-link collapsed" 
              href="#a" 
              onClick={() => handleCollapse(index)}
            >
              <i className={item.icon} />
              <span>{item.title}</span>
              <i className={`bi ${collapsedItems[index] ? 'bi-chevron-up' : 'bi-chevron-down'} ms-auto`} />
            </Link>
            <ul 
              id={`components-nav-${item.id}`} 
              className={`nav-content collapse ${collapsedItems[index] ? 'show' : ''}`} 
              data-bs-parent="#sidebar-nav"
            >
              {item.links.map((link, linkIndex) => (
                <React.Fragment key={linkIndex}>
                  {link.subLinks ? (
                    <li>
                      <a 
                        href={link.to} 
                        className="nav-link collapsed" 
                        onClick={() => handleSubCollapse(index, linkIndex)}
                      >
                        <i className="bi bi-circle" />
                        <span>{link.text}</span>
                        <i className={`bi ${collapsedSubItems[index][linkIndex] ? 'bi-chevron-up' : 'bi-chevron-down'} ms-auto`} />
                      </a>
                      <ul className={`nav-content collapse ${collapsedSubItems[index][linkIndex] ? 'show' : ''}`}>
                        {link.subLinks.map((subLink, subLinkIndex) => (
                          <li key={subLinkIndex}>
                            <Link to={subLink.to}>
                              <i className="bi bi-circle" /><span>{subLink.text}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ) : (
                    <li>
                      <Link to={link.to}>
                        <i className="bi bi-circle" /><span>{link.text}</span>
                      </Link>
                    </li>
                  )}
                </React.Fragment>
              ))}
            </ul>
          </>
        ) : (
          <Link to={item.to} className="aab nav-link ">
            <i className={item.icon} />
            <span id='qa'>{item.title}</span>
          </Link>
        )}
      </li>
    ))}

    </ul>
  </aside>
    </div>
    
  {/* End Sidebar*/}
{/* ============================================================================ */}

<main id="main" className="main">
        <div className="pagetitle">
        {club ? (     <h1 >Welcome to {club.cname}</h1>
              ):(<>ok</>)}
            <nav>
              <ol className="breadcrumb mt-3" >
                <li className="breadcrumb-item"><a href="/">All Clubs</a></li>
                <li className="breadcrumb-item active">Create Clubs</li>
              </ol>
            </nav>
            </div>
          <section className="section-dashboard">
          <div className="row">
    <div className="col-lg-7">
        <div className="card">
            <div className="card-body">
            <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="card-title">Club Details</h5>
                </div>
                                
                                <div>
                                    {club ? (
                                        <div>
                                            <p><strong>Name:</strong> {club.name}</p>
                                            <p><strong>Club Name:</strong> {club.cname}</p>
                                            <p><strong>Club Email:</strong> {club.email}</p>
                                        
                                            
                                            {/* Display other details if needed */}
                                        </div>
                                    ) : (
                                        <p>No club details available.</p>
                                    )}
                                </div>
                                </div>
        </div>
    </div>
    </div>
                </section>
        </main>
            </>
    );
};

export default Clubdetail;
