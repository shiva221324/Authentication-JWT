import React from "react";
import { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
const Signup = () => {
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const changeHandler = (event) => {
    setData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    console.log(data);
  };
  const navigate = useNavigate();
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:8080/auth/signup", data);
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="mx-auto flex justify-center items-center ">
      <div className="text-white dark:bg-gray-800 w-1/4 min-h-96 shadow-md max-w-sm rounded-md  ">
        <form className=" flex flex-col" onSubmit={submitHandler}>
          <h3 className=" font-semibold text-xl flex justify-center ">
            Sign Up
          </h3>
          <div className=" m-3 flex flex-col">
            <label htmlFor="email" className="py-2 font-medium">
              Username
            </label>
            <input
              className=" rounded-sm  border  sm:text-sm w-full p-2.5 bg-gray-600 border-gray-500"
              name="username"
              placeholder="Enter your username"
              onChange={changeHandler}
            />
          </div>
          <div className=" m-3 flex flex-col">
            <label htmlFor="email" className="py-2 font-medium">
              Email
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
              Password
            </label>
            <input
              className=" rounded-sm  border sm:text-sm w-full p-2.5 bg-gray-600 border-gray-500"
              type="password"
              name="password"
              placeholder="......"
              onChange={changeHandler}
            />
          </div>
          <button
            type="submit"
            className=" m-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            Register
          </button>
          <p className="text-center mb-4">
            Have an Account?
            <NavLink to="/login" className=" text-center hover:underline">
              Login
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
