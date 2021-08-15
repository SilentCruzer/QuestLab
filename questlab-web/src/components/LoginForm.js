import React, { useEffect, useState } from "react";
import { useQuery, useMutation, gql } from "@apollo/client";
import { LOAD_USER_lOGIN } from "../GraphQL/Mutations";
import Home from "../Home";
import "../index.css";

function LoginForm() {
  const [getUser, { data, loading, error }] = useMutation(LOAD_USER_lOGIN);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(false);

  const getItem = () => {
    getUser({
      variables: {
        username: username,
        password: password,
      },
    });

    if (error) {
      console.log(error);
    } else {
      if (data != undefined && data.tokenAuth.success) {
        setStatus(true);
      }
    }
  };

  const [details, setDetails] = useState({ name: "", email: "", password: "" });

  const submitHandler = (e) => {
    e.preventDefault();
    getItem();
  };

  return (
    <form onSubmit={submitHandler}>
      {status ? (
        <Home />
      ) : (
          <div className="form-inner">
            <h2>Login</h2>
            {/* ERROR */}
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
            <input type="submit" value="LOGIN" />
          </div>
        
      )}
    </form>
  );
}

export default LoginForm;
