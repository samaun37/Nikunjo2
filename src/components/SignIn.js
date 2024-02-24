import React, { useState, useContext ,useEffect } from "react";
import { Form, Input, Select, Button } from "antd";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import "./SignIn.css";
import bcrypt from "bcryptjs";
import { useDispatch ,useSelector } from "react-redux";
import { tryLoginUser,logout } from "../store/userSlice";

export function SignIn() {
  const dispatch = useDispatch();
  const { Option } = Select;
  const [form] = Form.useForm();
  const [selectedOption, setSelectedOption] = useState("login");
  const handleSelectChange = (value) => {
    setSelectedOption(value);
  };

  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [loginUser, setLoginUser] = useState({
    email: "",
    password: "",
  });
  const loginHandleChange = (e) => {
    const { name, value } = e.target;
    setLoginUser({ ...loginUser, [name]: value });
  };
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const hashPassword = (password) => {
    try {
      const hashedPassword = bcrypt.hashSync(password, '$2a$10$CwTycUXWue0Thq9StjUM0u')
      console.log("Hashed Password:", hashedPassword);
      return hashedPassword;
    } catch (error) {
      console.error("Error hashing password:", error);
      return null;
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = () => {
    console.log("in onsubmit");
    const { username, email, phone, password, confirmPassword } = user;
    if (username && email && phone && password && confirmPassword) {
      console.log(user);
      if (!validateEmail(email)) {
        alert("Please enter a valid email address");
        return;
      }
      if (password === confirmPassword) {
        var hashedPassword = hashPassword(password);
        const userData = {
          username,
          email,
          phone,
          password: hashedPassword,
        };
        try {
          Axios.post("http://localhost:3001/signUp", userData, {
            headers: {
              "Content-Type": "application/json",
            },
          }).then((res) => {
            console.log("Signed up successfully");
          });
        } catch (error) {
          console.error(error);
        }
      } else {
        alert("password does not match");
      }
    } else {
      alert("Enter All fields");
    }
  };

  const logoutHandle = ()=>{
    console.log(" came here at least")
    dispatch(logout())
  }

  const loginHandleSubmit = () => {
    console.log(loginUser);

    const { email, password } = loginUser;
    if (email && email) {
      console.log(loginUser);
      if (!validateEmail(email)) {
        alert("Please enter a valid email address");
        return;
      }
      var hashedPassword = hashPassword(password);
      const loginData = {
        email,
        password: hashedPassword,
      };
      try {
        Axios.post("http://localhost:3001/signIn", loginData, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log("Logged in successfully");
          console.log(res.data)
          const user = res.data.user
          dispatch(tryLoginUser(user.email))
          
        })
        .catch((error) => {
          console.error("Error logging in:", error);
        });
      } catch (error) {
        console.error("Unexpected error occurred:", error);
      }
    } else {
      alert("Enter All fields");
    }
  };

  return (
    <div className="signInPage">
      <Select
        defaultValue="login"
        style={{ width: 200 }}
        onChange={handleSelectChange}
      >
        <Option value="login">Login</Option>
        <Option value="sign in">Sign Up</Option>
      </Select>
      {selectedOption === "login" ? (
        <div>
          <h2>Log in into your account</h2>
          <form className="signInForm">
            <div className="">
              <label>Email</label>
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={loginUser.email}
                onChange={loginHandleChange}
              />
            </div>

            <div className="">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={loginUser.passwordL}
                onChange={loginHandleChange}
              />
            </div>
          </form>
          <Button
            className="submitButton"
            htmlType="submit"
            onClick={loginHandleSubmit}
          >
            Login
          </Button>
        </div>
      ) : (
        <div>
          <h1>Create account</h1>
          <form className="signInForm">
            <div className="">
              <label>Username</label>
              <input
                type="text"
                name="username"
                placeholder="Choose a username"
                value={user.username}
                onChange={handleChange}
              />
            </div>
            <div className="">
              <label>Email</label>
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={user.email}
                onChange={handleChange}
              />
            </div>
            <div className="">
              <label>Phone number</label>
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={user.phone}
                onChange={handleChange}
              />
            </div>
            <div className="">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={user.password}
                onChange={handleChange}
              />
            </div>
            <div className="">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={user.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </form>
          <Button
            className="submitButton"
            htmlType="submit"
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
        </div>
      )}
      <div className="logout-container">
        <Button className="logout-button" onClick={logoutHandle}>
          Logout
        </Button>
      </div>
    </div>
  );
}
