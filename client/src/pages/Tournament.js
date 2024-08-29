import React,{useState,useEffect,useRef} from 'react'
import {  Link ,useLocation} from 'react-router-dom';
import toast,  { Toaster } from "react-hot-toast"
import axios from 'axios';

const Tournament = () => {
  
  
  const location = useLocation();

    const handleSidebarToggle = () => {
        const sidebar = document.getElementById('sidebar');
        sidebar.classList.toggle('active');
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
    
    // ========================================================creat owner========
    
   
    
    const [image, setImage] = useState(null);
    const formRef = useRef(null);
    const handleSubmit = async (event) => {
      event.preventDefault();
  
      const formData = new FormData();
      formData.append('name', event.target.name.value);
      formData.append('contacts', phone);
      formData.append('city', event.target.city.value);
      if (image) {
        formData.append('image', image);
      }
  
      try {
        const response = await fetch('/api/v1/owner', {
          method: 'POST',
          body: formData,
        });
  
        if (response.ok) {
          toast.success('Owner created successfully');
          fetchOwners();
          formRef.current.reset();
          setImage(null);
         
        } else {
          toast.error('Failed to create Owner');
        }
      } catch (error) {
        toast.error('An error occurred');
      }
    };
  
    const handleImageChange = (event) => {
      setImage(event.target.files[0]);
    };
 
// ===================get owner

const [owners, setOwners] = useState([]);
const [selectedOwners, setSelectedOwners] = useState([]);

useEffect(() => {
  fetchOwners();
}, []);

const fetchOwners = async () => {
  try {
    const response = await axios.get('/api/v1/allowners');
    setOwners(response.data);
  } catch (error) {
    console.error('Error fetching owners:', error);
  }
};

const handleSelectOwner = (owner) => {
  setSelectedOwners((prev) => [...prev, owner]);
};

const handleRemoveOwner = (owner) => {
  setSelectedOwners((prev) => prev.filter((o) => o._id !== owner._id));
};
// ================================== update ==========
const [editingOwner, setEditingOwner] = useState(null);
const [deletingOwner, setDeletingOwner] = useState(null);

const handleEditClick = (owner) => {
  setEditingOwner(owner); // Open the modal with owner data
};

const handleSave = async (id, updatedData) => {
  try {
    const response = await axios.put(`/api/v1/owners/${id}`, updatedData);
    if (response.data.success) {
      toast.success(response.data.message);
      setOwners(owners.map(owner => (owner._id === id ? response.data.owner : owner)));
      setEditingOwner(null); // Close the modal
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.error('Error updating owner:', error);
    toast.error('Something went wrong');
  }
};


  // Function to handle delete click
  const handleDeleteClick = (owner) => {
    setDeletingOwner(owner); // Open the delete confirmation modal
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await axios.delete(`/api/v1/owners/${deletingOwner._id}`);
      if (response.data.success) {
        toast.success(response.data.message);
        setOwners(owners.filter(owner => owner._id !== deletingOwner._id)); // Remove the deleted owner from the list
        setDeletingOwner(null); // Close the delete confirmation modal
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error deleting owner:', error);
      toast.error('Something went wrong');
    }
  };


  //=======================================================Validation===================
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState(""); // State for phone validation error

  const handlePhoneChange = (e) => {
    const newPhone = e.target.value;
    // Validate for digits and symbols (+, -, (, ))
    if (/^[\d+\-()]*$/.test(newPhone)) {
      setPhone(newPhone);
      setPhoneError("");
    } else {
      setPhoneError("Phone number can only contain digits and symbols + - ( )");
    }
  };

//   =============================================pagination=========================
const [currentPage, setCurrentPage] = useState(1);
const [storesPerPage] = useState(20); // Number of stores per
 // Logic for pagination
 const indexOfLastStore = currentPage * storesPerPage;
 const indexOfFirstStore = indexOfLastStore - storesPerPage;
 const currentStores = owners.slice(indexOfFirstStore, indexOfLastStore);

 const paginate = (pageNumber) => setCurrentPage(pageNumber);
//======================================================================get clubs
   const [clubs, setClubs] = useState([]);
   const [selectedClub, setSelectedClub] = useState("");
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
//===========================================================================get owners=========




// ===============================================================================
  return (
    <>
<div>
  {/* ======= Header ======= */}
  <header id="header" className="header fixed-top d-flex align-items-center">
    <div className="d-flex align-items-center justify-content-between">
      <a href="/create" className="logo d-flex align-items-center">
      
        <span className="zz d-none d-lg-block">Pigeon</span>
      </a>
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
            <h1 >Add Tournament</h1>
            <nav>
              <ol className="breadcrumb mt-3" >
                <li className="breadcrumb-item"><a href="/">All Tournament</a></li>
                <li className="breadcrumb-item active">Create Tournament</li>
              </ol>
            </nav>
          </div>

 <section className="section-dashboard">
  <div className="row">
    <div className="col-lg-12">
      <div className="card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="card-title">Enter Details</h5>
          </div>
          <form onSubmit={handleSubmit} encType="multipart/form-data"> 
            <div className="row">
              <div className="col-lg-12 col-md-6 col-sm-12 mb-3">
              <select
                value={selectedClub}
                onChange={(e) => setSelectedClub(e.target.value)}
                className="form-control select-club"
                required
            >
                <option value="">Select Club</option>
                {clubs.map((club) => (
                    <option key={club._id} value={club.cname}>
                        {club.cname}
                    </option>
                ))}
            </select>
        </div>
              <div className="col-lg-12 col-md-6 col-sm-12 mb-3">
                <input type="text" id="name" name="name" placeholder='Tournament Name' className="form-control" required/>
              </div>
             

     
              <div className="col-lg-12 col-md-6 col-sm-12 mb-3">
                <input type="text" id="cnic" name="cnic" placeholder='Number of days' className="form-control" required/>
              </div>

              <div className="col-lg-12 col-md-6 col-sm-12 mb-3">
                <input type="text" id="nationality" name="nationality" placeholder='Number of Pigeons' className="form-control" required/>
              </div>
              <div className="col-lg-12 col-md-6 col-sm-12 mb-3">
                <input type="text" id="religion" name="religion" placeholder='Note Time for pigeons' className="form-control"/>
              </div>
           
              <div className="col-lg-12 col-md-6 col-sm-12 mb-3">
                <input type="text" id="contacts" name="contacts" placeholder='Continue Days' className="form-control" required/>
              </div>

              <div className="col-lg-12 col-md-6 col-sm-12 mb-3">
                <input type="text" id="state" name="state" placeholder='Status' className="form-control"/>
              </div>
              <div className="col-lg-12 col-md-6 col-sm-12 mb-3">
                <input type="text" id="city" name="city" placeholder='Type' className="form-control" required/>
              </div>
              <div className="col-lg-12 col-md-6 col-sm-12 mb-3">
              <input
        type="text"
        id="zipcode"
        name="zipcode"
        placeholder="Participating Lofts"
        className="form-control"
        readOnly
        value={selectedOwners.map((owner) => owner.name).join(', ')}
      />
      <div className="dropdown">
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Select Owners
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
          {owners.map((owner) => (
            <li key={owner._id}>
              <Link
                className="dropdown-item"
                href="#a"
                onClick={() => handleSelectOwner(owner)}
              >
                <img src={owner.image} alt="" width="30" height="30" />
                {owner.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="selected-owners mt-2">
        {selectedOwners.map((owner) => (
          <div key={owner._id} className="selected-owner">
            <span>{owner.name}</span>
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() => handleRemoveOwner(owner)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

              </div>
              
              <div className="col-12  mb-3">
                <input type="text" id="address" name="address" placeholder='Number of prizes' className="form-control" required/>
              </div>

              <div className="col-12 mb-3">
                <input type="text" id="address2" name="address2" placeholder='Prize 1' className="form-control"/>
              </div>
              <div className="col-lg-12 col-md-6 col-sm-12 mb-3">
                <input type="text" id="jobtitle" name="jobtitle" placeholder='Prize 2' className="form-control" required/>
              </div>
              <div className="col-lg-12 col-md-6 col-sm-12 mb-3">
                <input type="text" id="department" name="department" placeholder='Prize 3' className="form-control" required/>
              </div>
              <div className="col-lg-12 col-md-6 col-sm-12 mb-3">
                <input type="text" id="Location" name="Location" placeholder='Prize 4' className="form-control"/>
              </div>
              <div className="col-lg-12 col-md-6 col-sm-12 mb-3">
                <input type="text" id="Location" name="Location" placeholder='Prize 5' className="form-control"/>
              </div>

              <div className="col-lg-12 col-md-6 col-sm-12 mb-3">
                <label htmlFor="inputDate">Start Date</label>
                <input type="date" id="Birthdate" name="Birthdate" className="form-control" required/>
              </div>
              
              <div className="col-lg-12 col-md-6 col-sm-12 mb-3">
                <label htmlFor="inputDate">Start Time</label>
                <input type="time" id="Hiredate" name="Hiredate" className="form-control" required/>
              </div>

              <div className="col-lg-12 col-md-6 col-sm-12 mb-3">
                <label htmlFor="inputimage" id='pp'>Upload Image</label>
                <input type="file" id="image" name="image" className="form-control" accept="image/*" onChange={handleImageChange} />
              </div>

            </div>
            <button type='submit' id='dd' className='btn btn-primary '>Save</button>
            <Toaster />
          </form>
        </div>
      </div>
    </div>
  </div>
</section>
        </main>

            {/* Edit Modal */}
       {/* Edit Modal */}
       {editingOwner && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Owner</h5>
                <button type="button" className="close" onClick={() => setEditingOwner(null)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  value={editingOwner.name}
                  onChange={(e) => setEditingOwner({ ...editingOwner, name: e.target.value })}
                  placeholder="Enter Name"
                  className="form-control mb-3"
                />
                <input
                  type="text"
                  value={editingOwner.contacts}
                  onChange={(e) => setEditingOwner({ ...editingOwner, contacts: e.target.value })}
                  placeholder="Enter Contacts"
                  className="form-control mb-3"
                />
                <input
                  type="text"
                  value={editingOwner.city}
                  onChange={(e) => setEditingOwner({ ...editingOwner, city: e.target.value })}
                  placeholder="Enter City"
                  className="form-control mb-3"
                />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setEditingOwner(null)}>
                  Close
                </button>
                <button type="button" className="btn btn-primary" onClick={() => handleSave(editingOwner._id, editingOwner)}>
                  Save changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingOwner && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button type="button" className="close" onClick={() => setDeletingOwner(null)}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete the owner "{deletingOwner.name}"?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setDeletingOwner(null)}>
                  Cancel
                </button>
                <button type="button" className="btn btn-danger" onClick={handleConfirmDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    
    </>
  )
}

export default Tournament