import "./App.css";
import RegistrationLogin from "./components/RegistrationLogin";
import UtenteLogin from "./components/UtenteLogin.jsx";
import HomeRoster from "./components/HomeRoster.jsx";
import MyNavbar from "./components/MyNavbar.jsx";
import CharactersMovelist from "./components/CharactersMovelist.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        <MyNavbar />
        <Routes>
          <Route path="/" element={<HomeRoster />} />
          <Route path="/character/:name" element={<CharactersMovelist />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
