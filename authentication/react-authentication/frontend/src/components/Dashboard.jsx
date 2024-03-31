import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  axios.defaults.withCredentials = true;
  useEffect(() => {
    const navigate = useNavigate();
    axios.get("http://localhost:8080/auth/verify").then((res) => {
      if (res.data.success) {
      } else {
        navigate("/");
      }
      console.log(res);
    });
  }, []);
  return <div>Dashboard</div>;
};

export default Dashboard;
