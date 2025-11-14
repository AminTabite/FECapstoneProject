import "./App.css";
import RegistrationLogin from "./components/RegistrationLogin";
import UtenteLogin from "./components/UtenteLogin.jsx";
import HomeRoster from "./components/HomeRoster.jsx";
import MyNavbar from "./components/MyNavbar.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <>
      <MyNavbar />
      <HomeRoster />
    </>
  );
}

export default App;
