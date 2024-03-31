import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Home from "./components/Home.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Forgot from "./components/Forgot.jsx";
import Reset from "./components/Reset.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/forgotpassword" element={<Forgot />}></Route>
          <Route path="/resetpassword/:token" element={<Reset />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
