import React,{useState,useEffect} from 'react'
import {  Link ,useNavigate,useLocation} from 'react-router-dom';
import toast,  { Toaster } from "react-hot-toast"
import axios from 'axios';

const Createclub = () => {
  const location = useLocation();
  
  

    const handleSidebarToggle = () => {
        const sidebar = document.getElementById('sidebar');
        if(sidebar){
        sidebar.classList.toggle('active');
      }else{
        console.error("Sidebar element not found")
      }
      };



    // =========================================================================
    
      // Define the nav items with multiple links and nested collapsible links
      const navItems = [
      
        {
          id: 1,
          title: 'Create Club',
          icon: "bi bi-suit-club",
          links: [], // No sub-links, so this will render as a single link
          to: '/create',
        },
     
        {
          id: 2,
          title: 'Pigeon Owners',
          icon: "bi bi-person",
          links: [], // No sub-links, so this will render as a single link
          to: '/pigeonowner',
        },
        {
          id: 3,
          title: 'Tournament',
          icon: "bi bi-trophy",
          links: [], // No sub-links, so this will render as a single link
          to: '/Tournament',
        },
        {
          
            id: 4,
            title: 'LOGOUT',
            icon: "bi bi-box-arrow-right",
            links: [],
          
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
    const [email,setEmail] = useState('')
    const [name,setName] = useState('')
    const [cname,setcName] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate()
      
  
    const handlesubmit = async(e) =>{
      e.preventDefault()
      try {
        const res = await axios.post('/api/v1/auth/register',{email,name,cname,password,role:0}
        );
        if( res.data.success){
          toast.success( res.data.message)
          navigate('/')
        }
        else{
          toast.error(res.data.message) 
        }
      } catch (error) {
        console.log(error)
        toast.error('Something Went wrong')
    }
  };
 
// ===================get clubs

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
// ================================== update ==========
const [editingClub, setEditingClub] = useState(null);

const handleEditClick = (club) => {
  setEditingClub(club); // Open the modal with the club data
};

// Function to handle saving changes
const handleSave = async (id, updatedData) => {
  try {
    const response = await axios.put(`/api/v1/auth/clubs/${id}`, updatedData);
    if (response.data.success) {
      toast.success(response.data.message);
      setClubs(clubs.map(club => (club._id === id ? response.data.club : club)));
      setEditingClub(null); // Close the modal
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.error('Error updating club:', error);
    toast.error('Something went wrong');
  }
};

  // Function to handle delete click
  const [deletingClub, setDeletingClub] = useState(null); // For deleting
  const handleDeleteClick = (club) => {
    setDeletingClub(club); // Open the delete confirmation modal
  };

  // Function to confirm and delete the club
  const handleConfirmDelete = async () => {
    try {
      const response = await axios.delete(`/api/v1/auth/clubs/${deletingClub._id}`);
      if (response.data.success) {
        toast.success(response.data.message);
        setClubs(clubs.filter(club => club._id !== deletingClub._id)); // Remove the deleted club from the list
        setDeletingClub(null); // Close the delete confirmation modal
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error deleting club:', error);
      toast.error('Something went wrong');
    }
  };



  //==========================================================================
  

  return (
    <div id='zooma'>
<div>
  {/* ======= Header ======= */}
  <header id="header" className="header fixed-top d-flex align-items-center">
    <div className="d-flex align-items-center justify-content-between">
      <a href="/create" className="logo d-flex align-items-center">
      
        <span className="zz d-none d-lg-block">Pigeon</span>
      </a>
      <button id="toggle-sidebar-btn" className="bi bi-list toggle-sidebar-btn .sidebar" onClick={handleSidebarToggle} />
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
            
            <span className="d-none d-md-block  ps-2">Welcome : Ch Mansha</span>
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
              className={`nav-link collapsed ${
                location.pathname.startsWith(item.to) ? 'active bg-orange' : ''
              }`}
              href="#a"
              onClick={() => handleCollapse(index)}
            >
              <i className={item.icon} />
              <span>{item.title}</span>
              <i
                className={`bi ${
                  collapsedItems[index] ? 'bi-chevron-up' : 'bi-chevron-down'
                } ms-auto`}
              />
            </Link>
            <ul
              id={`components-nav-${item.id}`}
              className={`nav-content collapse ${
                collapsedItems[index] ? 'show' : ''
              }`}
              data-bs-parent="#sidebar-nav"
            >
              {item.links.map((link, linkIndex) => (
                <React.Fragment key={linkIndex}>
                  {link.subLinks ? (
                    <li>
                      <a
                        href={link.to}
                        className={`nav-link collapsed ${
                          location.pathname === link.to ? 'active bg-orange' : ''
                        }`}
                        onClick={() => handleSubCollapse(index, linkIndex)}
                      >
                        <i className="bi bi-circle" />
                        <span>{link.text}</span>
                        <i
                          className={`bi ${
                            collapsedSubItems[index][linkIndex]
                              ? 'bi-chevron-up'
                              : 'bi-chevron-down'
                          } ms-auto`}
                        />
                      </a>
                      <ul
                        className={`nav-content collapse ${
                          collapsedSubItems[index][linkIndex] ? 'show' : ''
                        }`}
                      >
                        {link.subLinks.map((subLink, subLinkIndex) => (
                          <li key={subLinkIndex}>
                            <Link to={subLink.to}>
                              <i className="bi bi-circle" />
                              <span>{subLink.text}</span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ) : (
                    <li>
                      <Link
                        to={link.to}
                        className={`nav-link ${
                          location.pathname === link.to ? 'active bg-orange' : ''
                        }`}
                      >
                        <i className="bi bi-circle" />
                        <span>{link.text}</span>
                      </Link>
                    </li>
                  )}
                </React.Fragment>
              ))}
            </ul>
          </>
        ) : item.title === 'LOGOUT' ? (
          <button className="aab nav-link">
            <i className={item.icon} />
            <span id="qa">{item.title}</span>
          </button>
        ) : (
          <Link
            to={item.to}
            className={`aab nav-link ${
              location.pathname === item.to ? 'active bg-orange' : ''
            }`}
          >
            <i className={item.icon} />
            <span id="qa">{item.title}</span>
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
            <h1 >Create Clubs</h1>
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
                    <h5 className="card-title">Enter Details</h5>
                </div>
                <form onSubmit={handlesubmit} className="row g-3 needs-validation">
                    <div className="col-6 me-3">
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} name="name" className="aaq form-control" id="yourName" required placeholder='Enter Your Name' />
                        <div className="invalid-feedback">Please, enter your name!</div>
                    </div>
                    <div className="col-6">
                        <input type="text" value={cname} onChange={(e) => setcName(e.target.value)} name="cname" className="aaq form-control" id="yourClub" required placeholder='Enter Your Club' />
                        <div className="invalid-feedback">Please, enter your Club!</div>
                    </div>
                    <div className="col-6 me-3">
                       
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" className="aaq form-control" id="yourEmail" required placeholder='Enter Your Email' />
                            <div className="invalid-feedback">Please enter a valid Email address!</div>
                       
                    </div>
                    <div className="col-6 me-5">
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" className="aaq form-control" id="yourPassword" required placeholder='Enter Your Password' />
                        <div className="invalid-feedback">Please enter your password!</div>
                    </div>
        
                    <div className="col-4 ms-5">
                        <button className="zza btn btn-primary w-100" type="submit">Create Club</button>
                        <Toaster />
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div className="col-lg-4">
        <div className="card">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 className="card-title">Total Clubs</h5>
                </div>
                <p className="ddz card-text">{clubs.length}</p>
            </div>
        </div>
    </div>
</div>
<div className="row mt-4">
    <h1 id='wwz'>All Clubs</h1>
    {clubs.map((club) => (
      <div key={club._id} className="col-lg-3 col-md-6 col-sm-12 mb-4">
        <div className="card club-card">
          <div className="card-body">
            <h5 className="card-title">{club.cname}</h5>
            <p className="card-text">Managed by: {club.name}</p>
            <p className="card-text">Email: {club.email}</p>
            <button
              className="mmh btn btn-primary me-2"
              onClick={() => handleEditClick(club)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger"
              onClick={() => handleDeleteClick(club)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    ))}
  </div>
                </section>
        </main>

            {/* Edit Modal */}
       {/* Edit Modal */}
       {editingClub && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Club</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setEditingClub(null)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  value={editingClub.name}
                  onChange={(e) => setEditingClub({ ...editingClub, name: e.target.value })}
                  placeholder="Enter Name"
                  className="form-control mb-3"
                />
                <input
                  type="text"
                  value={editingClub.cname}
                  onChange={(e) => setEditingClub({ ...editingClub, cname: e.target.value })}
                  placeholder="Enter Club Name"
                  className="form-control mb-3"
                />
                <input
                  type="email"
                  value={editingClub.email}
                  onChange={(e) => setEditingClub({ ...editingClub, email: e.target.value })}
                  placeholder="Enter Email"
                  className="form-control mb-3"
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setEditingClub(null)}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleSave(editingClub._id, editingClub)}
                >
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

          {/* Delete Confirmation Modal */}
          {deletingClub && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button
                  type="button"
                  className="close"
                  onClick={() => setDeletingClub(null)}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete the club "{deletingClub.cname}"?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setDeletingClub(null)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleConfirmDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Createclub