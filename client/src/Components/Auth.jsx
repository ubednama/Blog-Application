import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../apis/axoisInstance";
import { useAuth } from "../hooks/AuthContext";

const Auth = ({ isSignup = false }) => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    title: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (isSignup) {
        response = await axiosInstance.post("/user/register", formData);
      } else {
        response = await axiosInstance.post("/user/login", {
          username: formData.username,
          password: formData.password,
        });
      }
      login(response.data.token);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
    console.log(formData);
  };

  return (
    <div className="flex justify-center items-center h-full bg-[#E5ECF3]">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-96 md:w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-[#6947BF]">
          {isSignup ? "Sign Up" : "Login"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 bg-white">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-[#7A8196]"
            >
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-[#C1CCD6] rounded-md shadow-sm focus:outline-none focus:ring-[#6947BF] focus:border-[#6947BF] sm:text-sm bg-white text-[#5B6170]"
            />
          </div>
          {isSignup && (
            <>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-[#7A8196]"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-[#C1CCD6] rounded-md shadow-sm focus:outline-none focus:ring-[#6947BF] focus:border-[#6947BF] sm:text-sm bg-white text-[#5B6170]"
                />
              </div>
              <div>
                <label
                  htmlFor="title"
                  className="block text-sm font-medium text-[#7A8196]"
                >
                  I am a...
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-[#C1CCD6] rounded-md shadow-sm focus:outline-none focus:ring-[#6947BF] focus:border-[#6947BF] sm:text-sm bg-white text-[#5B6170]"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-[#7A8196]"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full px-3 py-2 border border-[#C1CCD6] rounded-md shadow-sm focus:outline-none focus:ring-[#6947BF] focus:border-[#6947BF] sm:text-sm bg-white text-[#5B6170]"
                />
              </div>
            </>
          )}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#7A8196]"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-[#C1CCD6] rounded-md shadow-sm focus:outline-none focus:ring-[#6947BF] focus:border-[#6947BF] sm:text-sm bg-white text-[#5B6170]"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#6947BF] text-white font-semibold rounded-full hover:bg-[#5d39a5] transition-colors duration-300"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-sm text-[#7A8196]">
            {isSignup ? "Already have an account?" : "Don't have an account?"}
          </span>
          <Link
            to={isSignup ? "/login" : "/signup"}
            className="text-[#6947BF] hover:underline ml-1"
          >
            {isSignup ? "Login" : "Sign Up"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Auth;
