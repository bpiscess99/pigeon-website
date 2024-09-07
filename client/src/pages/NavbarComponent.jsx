import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';

function NavbarComponent() {
  const user = localStorage.getItem("user");
  
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
      <Navbar.Brand>Pigeon</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
        {
          user.role === 1
          ?
        (<>
          <Nav className="ms-auto">
          <Nav.Link >
            <NavLink to={"/clubs"}></NavLink>
          </Nav.Link>
            <Nav.Link>
            </Nav.Link>
            <NavDropdown title="Dashboard">
              <NavDropdown.Item>
                <NavLink to={"/clubs"}>Clubs</NavLink>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <NavLink to={"/clubs/create"}>Create Clubs</NavLink>
              </NavDropdown.Item> 
            </NavDropdown>
            <NavDropdown title="Tournaments">
              <NavDropdown.Item>
                <NavLink to={"/tournaments"}>Tournaments</NavLink>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <NavLink to={"/tournaments/tournamentForm"}>Create Tournament</NavLink>
              </NavDropdown.Item> 
            </NavDropdown>
            <NavDropdown title="Banners">
              <NavDropdown.Item>
                <NavLink to={"/banners"}>Banners</NavLink>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <NavLink to={"/banners/bannerForm"}>Create Banner</NavLink>
              </NavDropdown.Item> 
            </NavDropdown>

          </Nav>
        </>)  
        :
        (
          <>
          <Nav className="ms-auto">
          <Nav.Link >
            <NavLink to={""}></NavLink>
          </Nav.Link>
            <Nav.Link>
            </Nav.Link>
            <NavDropdown title="Tournaments">
              <NavDropdown.Item>
                <NavLink to={`/club/${user.slug}/tournaments`}>tournaments</NavLink>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <NavLink to={`/club/${user.slug}/createTournaments`}>Create tournament</NavLink>
              </NavDropdown.Item> 
            </NavDropdown>
            <NavDropdown title="Participants">
              <NavDropdown.Item>
                <NavLink to={`/club/${user.slug}/pigeonOwners`}>Participants</NavLink>
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                <NavLink to={`/club/${user.slug}/pigeonOwnerForm`}>Create Particiapant</NavLink>
              </NavDropdown.Item> 
            </NavDropdown>
          </Nav>
        </>
        )
        }
      </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;

