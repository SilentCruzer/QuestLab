import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
import './index.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from
} from "@apollo/client";
import {onError} from '@apollo/client/link/error'

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
        {" "}
        <LoginForm/>
    </ApolloProvider>
  </div> 
  
}

export default App;
