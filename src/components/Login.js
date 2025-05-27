import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../images/logo.png";
import image from "../images/Computer login-rafiki 1.png";

const Login = () => {
  const [data, setData] = useState({ username: "", password: "" });

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      //navigate("/exam")
      //const userData = localStorage.getItem('user-info')
      //alert(userData)
    }
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = {
      username: data.username,
      password: data.password,
    };
    axios
      .post("https://api.amaanatmedical.com/login", userData)
      .then((response) => {
        console.log(response, response.data.token);
        //console.log(document.cookie)
        localStorage.setItem("user-info", JSON.stringify(response));

        const userData = localStorage.getItem("user-info");

        const userdetail = JSON.parse(userData);

        if (userdetail.data.type === "admin") {
          navigate("/admin");
        } else {
          navigate("/authentication");
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log("server responded");
        } else if (error.request) {
          console.log("network error");
        } else {
          console.log(error);
        }
      });
  };

  return (
    <div className="register-container">
      <section className="registration">
        <h2>login</h2>

        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Username</legend>
            <input
              type=""
              placeholder="Enter your email address here"
              name="username"
              value={data.username}
              required
              onChange={handleChange}
            />
          </fieldset>

          <fieldset>
            <legend>Password</legend>
            <input
              type="password"
              placeholder="Enter your password here"
              name="password"
              value={data.password}
              required
              onChange={handleChange}
            />
          </fieldset>

          <button type="submit" className="login-btn">
            Login
          </button>

          <p className="enquiry">
            Don't have an account ? <Link to="/register">Register</Link>
          </p>
        </form>
      </section>

      <aside className="register-left">
        <Link
          to="/"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "20%",
            alignSelf: "end",
            marginTop: "2em",
          }}
        >
          <img src={logo} alt="logo" id="logo" />
        </Link>

        <img src={image} alt="" id="image" />
      </aside>
    </div>
  );
};

export { Login };
