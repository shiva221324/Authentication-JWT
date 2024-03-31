import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink, Link } from "react-router-dom";
import axios from "axios";

const forgot = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const submitHandler = async (event) => {
    event.preventDefault();
    console.log(email);
    try {
      const info = await axios.post("http://localhost:8080/auth/forgot", {
        email,
      });
      console.log(info);
      alert("check your email for reset password link");
      navigate("/login");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="mx-auto flex justify-center items-center ">
      <div className="text-white dark:bg-gray-800 w-1/4 min-h-44 shadow-md max-w-sm rounded-md  ">
        <form onSubmit={submitHandler} className=" flex flex-col">
          <h3 className=" font-semibold text-xl flex justify-center ">
            Forgot Password
          </h3>
          <div className=" m-3 flex flex-col">
            <label htmlFor="email" className="py-2 font-medium">
              Your Email
            </label>
            <input
              className=" rounded-sm  border  sm:text-sm w-full p-2.5 bg-gray-600 border-gray-500"
              name="email"
              placeholder="example@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            onClick={submitHandler}
            type="submit"
            className=" m-4 text-white bg-blue-700 hover:bg-blue-800  font-medium rounded-lg text-sm px-5 py-2.5 text-center "
          >
            Send reset link
          </button>
        </form>
      </div>
    </div>
  );
};

export default forgot;
