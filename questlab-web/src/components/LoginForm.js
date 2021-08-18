import React, { useEffect, useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { LOAD_USER_lOGIN } from "../GraphQL/Mutations";
import Home from "../Home";
import "./css/LoginForm.css";
import * as ReactBootStrap from 'react-bootstrap';
import NavbarComp from "./Navbar"
import {Route, Switch, BrowserRouter as Router} from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

function LoginForm() {
  const [getUser, { data, loading, error }] = useMutation(LOAD_USER_lOGIN);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(false);
  const [match, setMatch] = useState("");
  const [spinner, setSpinner] = useState(false);

  const getItem = () => {
    getUser({
      variables: {
        username: username,
        password: password,
      },
    });

    if (error) {
      console.log(error);
    } 
    if(data != undefined){
      setSpinner(true)
      console.log(data)
      if (data.tokenAuth.success) {
        console.log(data.tokenAuth.user.id)
        setStatus(true);
        setSpinner(false);
      }else{
        setSpinner(false)
        setMatch("Invalid username / password")
      }
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
          to= {`/home/${username}`}/>
        </div>
        
      ) : (
        <div className="parent">
          <div className="imgbox">
            <img src="bgw.jpg"/>
          </div>
          <div className="form-inner">
            <div className="formBx">
              <h2>Login</h2>
            {(match!= "") ? (<div className="match">{match}</div>) : ""}
            <form onSubmit={submitHandler}>
              <div className="form-group">
              <label htmlFor="name">Name:</label>
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
              <input type="submit" value="LOGIN" />
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

export default LoginForm;
