import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Createclub from "./pages/Createclub";
import Clubdetail from "./pages/Clubdetail";
import Pigeonowner from "./pages/Pigeonowner";
import Tournament from "./pages/TournamentLayout";
import TournamentsContainer from "./pages/TournamentsContainer";
import TournamentDetails from "./pages/TournamentDetails";
import CreateTournament from "./pages/CreateTournament";
import Layout from "./pages/Layout";
import TournamentLayout from "./pages/TournamentLayout";
import ClubContainer from "./pages/ClubContainer";
import Clubs from "./pages/Clubs";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
        <Route element={<Layout />}>
          <Route path="clubs" element={<ClubContainer />}>
            <Route index element={<Clubs />} />

            <Route path="/clubs/create" element={<Createclub />} />
          </Route>
          <Route path="/clubdetail/:slug" element={<Clubdetail />} />
          <Route path="/pigeonowner" element={<Pigeonowner />} />
          <Route element={<TournamentLayout />}>
            <Route
              path="/tournaments"
              index
              element={<TournamentsContainer />}
            />
            <Route
              path="/tournaments/tournamentForm"
              element={<CreateTournament />}
            />
            <Route path="/tournaments/:id" element={<TournamentDetails />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
