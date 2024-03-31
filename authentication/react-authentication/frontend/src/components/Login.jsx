import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  axios.defaults.withCredentials = true;
  const changeHandler = (event) => {
    setData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    //console.log(data);
  };
  const navigate = useNavigate();
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const metainfo = await axios.post(
        "http://localhost:8080/auth/login",
        data
      );
      if (metainfo.data.success) {
        navigate("/home");
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="mx-auto flex justify-center items-center ">
      <div className="text-white dark:bg-gray-800 w-1/4 min-h-96 shadow-md max-w-sm rounded-md  ">
        <form onSubmit={submitHandler} className=" flex flex-col">
          <h3 className=" font-semibold text-xl flex justify-center ">
            Login to your dashboard
          </h3>
          <div className=" m-3 flex flex-col">
            <label htmlFor="email" className="py-2 font-medium">
              Your Email
            </label>
            <input
              className=" rounded-sm  border  sm:text-sm w-full p-2.5 bg-gray-600 border-gray-500"
              name="email"
              placeholder="example@gmail.com"
              onChange={changeHandler}
            />
          </div>
          <div className=" m-3 flex flex-col">
            <label htmlFor="password" className="py-2 font-medium">
              Your Password
            </label>
            <input
              className=" rounded-sm  border sm:text-sm w-full p-2.5 bg-gray-600 border-gray-500"
              type="password"
              name="password"
              placeholder="......"
              onChange={changeHandler}
            />
          </div>

          <NavLink
            to="/forgotpassword"
            className="font-medium text-sm text-white hover:underline flex justify-center"
          >
            forgot Password?
          </NavLink>
          <button
            type="submit"
            className=" m-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            Login to your account
          </button>
          <div className="text-sm font-medium flex justify-center">
            Not registered?{" "}
            <NavLink to="/" className=" hover:underline">
              Create account
            </NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
