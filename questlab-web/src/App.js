import React, { useState } from 'react';
import LoginForm from './components/LoginForm'; 
import './index.css';
import Navbar from "./components/Navbar"
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from
} from "@apollo/client";
import {onError} from '@apollo/client/link/error'
import {Redirect, Route, Switch, BrowserRouter as Router} from "react-router-dom";
import Home from './Home';
import View from './View';
import Create from './Create';

const errorLink = onError(({graphqlErrors, networkErrors}) => {
  if(graphqlErrors) {
      graphqlErrors.map(({message, location, path}) =>{
          alert(`Graphq error ${message}`);
      });
  }
});
const link = from([
  errorLink,
  new HttpLink({uri: "http://127.0.0.1:8000/graphql/"})
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

function App() {

  return <div className="App">
    
    <ApolloProvider client= {client}>
        <Router>
          <Switch>
            <Route path="/login" component={LoginForm} />
            <>
              <Route path="/home/:name" component={Home} /> 
              <Route path="/view/:lab" component={View} /> 
              <Route path="/:user/create" component={Create} /> 
            </>
            
          </Switch>
      </Router>
        {" "}
        
    </ApolloProvider>
  </div> 
  
}

export default App;
