import "./App.css";
import RegistrationLogin from "./components/RegistrationLogin";
import UtenteLogin from "./components/UtenteLogin.jsx";
import HomeRoster from "./components/HomeRoster.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
function App() {
  return (
    <>
      <RegistrationLogin />
      <UtenteLogin />
      <HomeRoster />
    </>
  );
}

export default App;
