import "./App.css";
import RegistrationLogin from "./components/RegistrationLogin";
import UtenteLogin from "./components/UtenteLogin.jsx";
import HomeRoster from "./components/HomeRoster.jsx";
import MyNavbar from "./components/MyNavbar.jsx";
import CharactersMovelist from "./components/CharactersMovelist.jsx";
import LikedMoves from "./components/LikedMoves.jsx";
import Backoffice from "./components/Backoffice.jsx";
import UpdateForm from "./components/UpdateForm.jsx";
import UserProfile from "./components/UserProfile.jsx";
import NoAuthorization from "./components/NoAuthorization.jsx";
import NotFound from "./components/NotFound.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const role = useSelector((state) => state.main.role);

  return (
    <>
      <BrowserRouter>
        <MyNavbar />
        <Routes>
          <Route path="/register" element={<RegistrationLogin />} />
          <Route path="/login" element={<UtenteLogin />} />
          <Route path="/" element={<HomeRoster />} />
          <Route path="/character/:name" element={<CharactersMovelist />} />
          <Route path="/lab" element={<LikedMoves />} />
          <Route
            path="/backoffice"
            element={role === "ADMIN" ? <Backoffice /> : <NoAuthorization />}
          />
          <Route path="/edit-user/:id" element={<UpdateForm />} />
          <Route path="/edit-me/:id" element={<UserProfile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
