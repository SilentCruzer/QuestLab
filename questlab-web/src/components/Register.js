import React, { useEffect, useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { CREATE_USER } from "../GraphQL/Mutations";
import Home from "../Home";
import "./css/LoginForm.css";
import * as ReactBootStrap from 'react-bootstrap';
import NavbarComp from "./Navbar"
import {useHistory} from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

function Register() {
  const [createUser, { data, loading, error }] = useMutation(CREATE_USER);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(false);
  const [match, setMatch] = useState("");
  const [spinner, setSpinner] = useState(false);
  let history = useHistory();
  const getItem = () => {
    
    if(password == confirmPassword){
      createUser({
      variables: {
        username: username,
        password: password,
        email: email
      },
    });
    if (error) {
      console.log(error);
    } 
    if(data != undefined){
      history.push("/login")
    }else{
      setSpinner(false)
      }
    }
    else{
      setMatch("Passwords does not match")
    }
  };

  const [details, setDetails] = useState({ name: "", email: "", password: "" });

  const submitHandler = (e) => {
    e.preventDefault();
    getItem();

  };

  return (
    <div>
      {status ? (
        <div>
          <Redirect 
          to= {`/login`}/>
        </div>
        
      ) : (
        <div className="parent">
          <div className="imgbox">
            <img src="https://www.10wallpaper.com/wallpaper/1366x768/1607/Psst_Its_Camping_Time-August_2016_Calendar_Wallpaper_1366x768.jpg"/>
            <div className="logo">
              <img src="questlogo.png"/>
            </div>
          </div>
          <div className="form-inner">
            <div className="formBx">
              <h2>Register</h2>
            {(match!= "") ? (<div className="match">{match}</div>) : ""}
            <form onSubmit={submitHandler}>
            <div className="form-group">
              <label htmlFor="password">Email:</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
              <div className="form-group">
              <label htmlFor="name">Username:</label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Confirm Password:</label>
              <input
                type="password"
                name="password"
                id="password"
                onChange={(e) => {
                  setConfirm(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <input type="submit" value="Register" />
            </div>
            <div className="form-group">
              <p className="signup-text">Already have an account? <a href="/login">Login</a> </p>
            </div>
            </form>
            </div>
            {loading ? <ReactBootStrap.Spinner animation="border" /> : ""}
          </div>
        </div>
          
        
      )}
    </div>
  );
}

export default Register;
