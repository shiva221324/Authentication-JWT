import { React, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
const Home = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const handleLogout = () => {
    axios
      .get("http://localhost:8080/auth/logout")
      .then((res) => {
        if (res.data.success) {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      Home
      <button>
        <NavLink to="/dashboard">Dashboard</NavLink>
      </button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
