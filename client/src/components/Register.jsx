import React, { useEffect, useState } from "react";
import { register } from "../services/api.js";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Header from "./partials/Header.jsx";

function Register() {
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const navigation = useNavigate();
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      return navigation("/");
    }
  }, []);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log({form});
    const result = await register(form);
    // console.log(result);
    if (result.status === 200) {
      if (result.data.status === 201) {
        setErrors(result.data.data);
        toast(result.data.message);
        return;
      }
      if (result.data.status === 200) {
        localStorage.setItem("user", JSON.stringify(result.data.data));
        navigation("/");
        return;
      }
      if (result.data.status === 202) {
        toast(result.data.message);
        return;
      }
    } else {
      toast("Something went wrong");
    }
  };

  return (
    <div>
      <Header />
      <div className="container">
        <ToastContainer />
        <div className="row justify-content-center mt-4">
          <div className="col-lg-5 card border-primary mb-3">
            <div className="card-header h4 text-center">
              Register an Account
            </div>
            <div className="card-body">
              <div className="form-group">
                <label className="col-form-label mt-4">Name</label>
                <input
                  type="text"
                  onChange={handleInputChange}
                  name="name"
                  className="form-control"
                  placeholder="Enter Name"
                />
                {errors?.name && (
                  <small className="text-danger">{errors.name.msg}</small>
                )}
              </div>
              <div className="form-group">
                <label className="col-form-label mt-4">Username</label>
                <input
                  type="text"
                  name="username"
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="Enter Username"
                />
                {errors?.username && (
                  <small className="text-danger">{errors.username.msg}</small>
                )}
              </div>

              <div className="form-group">
                <label className="col-form-label mt-4">Email</label>
                <input
                  type="email"
                  name="email"
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="Enter Email"
                />
                {errors?.email && (
                  <small className="text-danger">{errors.email.msg}</small>
                )}
              </div>

              <div className="form-group">
                <label className="col-form-label mt-4">Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="Enter Password"
                />
                {errors?.password && (
                  <small className="text-danger">{errors.password.msg}</small>
                )}
              </div>

              <div className="d-flex justify-content-center mt-4">
                <button
                  onClick={handleSubmit}
                  type="button"
                  className="btn btn-outline-secondary"
                >
                  Register Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
