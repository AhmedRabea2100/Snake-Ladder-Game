import '../styles/auth.css'
import React, { useState } from "react"
import axios from "axios";
// const token = localStorage.getItem('token'); --> get token from localstorage


export default function (props) {
  let [authMode, setAuthMode] = useState("signin")
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register, setRegister] = useState();
  const [msg, setMsg] = useState(false);

  const handleSubmitReg = async (e, props) => {
    e.preventDefault();
     const data = {
        username,
        password
      };
    try{
    const response = await axios.post('http://localhost:8080/players/signup/', data);
    const x = response.data;
    alert(x)
    
    }
    catch (error) {
      alert("Please try again");
      
    }
  };

  const handleSubmitSignIn = async (e) => {
    e.preventDefault();
     const data={
        username,
        password
      };
    try{
    const response = await axios.post('http://localhost:8080/players/login/',data);
    const x = response.data.message;
    const token = response.data.token;
    const statusCode = response.status;
    alert(x)
    localStorage.setItem('token', token);

    if (statusCode == 200) {      
      window.location.href='/rooms'
    }

    } catch (error) {
      alert("Please try again");
    }
  };

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }

  if (authMode === "signin") {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign Up
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Username</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Enter Username"
                value={username}
              onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary" id="btnn" onClick={(e) => handleSubmitSignIn(e)}>
                Submit
              </button>
            </div>
           <p id="msg"></p>
          </div>
          
        </form>
      </div>
    )
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Register</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Sign In
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary" id="btnn" onClick={(e) => handleSubmitReg(e)} >
              Submit
            </button>
          </div>
          {!register ? (
          <p className="text-success"></p>
        ) : (
          <p className="text-danger">Username already exists</p>
        )}
        </div>
        
      </form>
    </div>
  )
}
