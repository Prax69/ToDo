import React, { useEffect, useState } from "react";
import { login } from "../services/api.js";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Login.css"; // Optional for custom styling
import Header from "./partials/Header.jsx";

export default function Login({ user, setUser }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      return navigate("/");
    }
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const result = await login(form);
    setErrors(null);

    if (result.status === 200) {
      if (result.data.status === 200) {
        localStorage.setItem("user", JSON.stringify(result.data.data));
        toast.success("Login successful!");
        navigate("/");
        return;
      }
      if (result.data.status === 201) {
        setErrors(result.data.data);
        return;
      }
      if (result.data.status === 202) {
        toast.error(result.data.message);
        return;
      }
    } else {
      toast.error("An unexpected error occurred.");
    }
  };

  return (
    <>
      <Header />
      <div className="login-container">
        <ToastContainer />
        <form className="login-form">
          <h2 className="text-center">Login</h2>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Email or Username
            </label>
            <input
              onChange={handleChange}
              name="username"
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter email or username"
            />
            {errors?.username && (
              <small className="text-danger">{errors.username.msg}</small>
            )}
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              onChange={handleChange}
              name="password"
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password"
              autoComplete="off"
            />
            {errors?.password && (
              <small className="text-danger">{errors.password.msg}</small>
            )}
          </div>
          <button
            type="submit"
            onClick={onSubmit}
            className="btn btn-primary w-100"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
