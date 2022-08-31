import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import Zones from "./routes/Zones";
import Records from "./routes/Records";
import SignUp from "./routes/SignUp.js";
import Login from "./routes/Login";
import Button from "./uikit/Button";

function App() {
  return (
    <div className="App">
      <header>
        <h1>
          HOSTS<b>dot</b>TXT
        </h1>

        <div style={{ display: "flex" }}>
          <Button
            className="LoginButton"
            primary
            onClick={() => (document.location = "/login")}
          >
            Login
          </Button>
          <Button
            className="LoginButton"
            secondary
            onClick={() => (document.location = "/signup")}
          >
            Sign Up
          </Button>
        </div>
      </header>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/zones" element={<Zones />} />
          <Route path="/zones/:zoneName" element={<Records />} />
          <Route path="/" exact element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
