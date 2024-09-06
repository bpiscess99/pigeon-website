import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Createclub from "./pages/Createclub";
import TournamentsContainer from "./pages/TournamentsContainer";
import TournamentDetails from "./pages/TournamentDetails";
import CreateTournament from "./pages/CreateTournament";
import Layout from "./pages/Layout";
import TournamentLayout from "./pages/TournamentLayout";
import ClubContainer from "./pages/ClubContainer";
import Clubs from "./pages/Clubs";
import ClubDashboardContainer from "./pages/ClubOwnerDashboard/ClubDashboardContainer";
import ClubTournaments from "./pages/ClubOwnerDashboard/ClubTournaments";
import TournamentForm from "./pages/components/TournamentForm";
import PigeonOwnerContainer from "./pages/PigeonOwner/PigeonOwnerContainer";
import PigeonOwnerForm from "./pages/PigeonOwner/PigeonOwnerForm";
import PigeonResultsForm from "./pages/results/PigeonResultsForm";
import PegionOwnersResult from "./pages/results/PegionOwnersResult";
import PigeonOwnerResultUpdate from "./pages/results/PigeonOwnerResultUpdate";
import BannerForm from "./pages/Banner/BannerForm";
import BannerContainer from "./pages/Banner/BannerContainer";
import BannerLayout from "./pages/Banner/BannerLayout";
import PigeonAdminContainer from "./pages/AdminPigeonOwnerContainer/PigeonAdminContainer";
import ClubOwnerDashboard from "./pages/ClubOwnerDashboard/ClubOwnerDashboard";
import LandingClubs from "./pages/LandingComponents/LandingClubs";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
        <Route element={<Layout />}>
          {/* clubs */}
          <Route path="/clubs" element={<ClubContainer />}>
            <Route index element={<Clubs />} />
            <Route path="create" element={<Createclub />} />
          </Route>

          {/* club owner dashboard */}
          <Route path="club/:id/" element={<ClubOwnerDashboard />}>
            <Route path="tournaments" element={<ClubTournaments />} />
            <Route path="createTournaments" element={<TournamentForm />} />
            <Route path="pigeonOwners" element={<PigeonOwnerContainer />} />
            <Route path="pigeonOwnerForm" element={<PigeonOwnerForm />} />
            <Route path="pigeonResultForm" element={<PigeonResultsForm />} />
            <Route path="pigeonOwnerResults" element={<PegionOwnersResult />} />
            <Route
              path="pigeonOwnerResultUpdate"
              element={<PigeonOwnerResultUpdate />}
            />
          </Route>

          {/* tournaments */}
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
          {/* bannners */}
          <Route element={<BannerLayout />}>
            <Route path="/banners/bannerForm" element={<BannerForm />} />
            <Route path="/banners" index element={<BannerContainer />} />
          </Route>

          <Route element={<PigeonAdminContainer />}>
            {/* <Route path="/pigeonOwners" element={<PegionOwnersResult />} /> */}
            {/* <Route path="/pigeonOwners/pigeonOwnerForm" index element={<BannerContainer />} /> */}
          </Route>
        </Route>
        <Route path="/cl" element={<LandingClubs />} />
      </Routes>
    </>
  );
}

export default App;
