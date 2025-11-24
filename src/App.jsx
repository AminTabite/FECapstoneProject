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
import MyFooter from "./components/MyFooter.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

function App() {
  const role = useSelector((state) => state.main.role);
  const dispatch = useDispatch();

  useEffect(() => {
    const savedRole = localStorage.getItem("role");
    if (savedRole) {
      dispatch({ type: "SET_ROLE", payload: savedRole });
    }
  }, [dispatch]);

  return (
    <BrowserRouter>
      <MyNavbar />
      <main className="main">
        <Routes>
          {/* Queste sono le route sempre accessibili */}
          <Route path="/register" element={<RegistrationLogin />} />
          <Route path="/login" element={<UtenteLogin />} />

          {/* route protette: senza il role, ritorna sulla pagina register */}
          <Route
            path="/"
            element={
              role ? <HomeRoster /> : <Navigate to="/register" replace />
            }
          />
          <Route
            path="/character/:name"
            element={
              role ? (
                <CharactersMovelist />
              ) : (
                <Navigate to="/register" replace />
              )
            }
          />
          <Route
            path="/lab"
            element={
              role ? <LikedMoves /> : <Navigate to="/register" replace />
            }
          />
          <Route
            path="/backoffice"
            element={
              role ? (
                role === "ADMIN" ? (
                  <Backoffice />
                ) : (
                  <NoAuthorization />
                )
              ) : (
                <Navigate to="/register" replace />
              )
            }
          />
          <Route
            path="/edit-user/:id"
            element={
              role ? <UpdateForm /> : <Navigate to="/register" replace />
            }
          />
          <Route
            path="/edit-me/:id"
            element={
              role ? <UserProfile /> : <Navigate to="/register" replace />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <MyFooter />
    </BrowserRouter>
  );
}

export default App;
