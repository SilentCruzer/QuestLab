import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { LOAD_USER_LABS } from "./GraphQL/Queries";
import "./components/css/Home.css";
import {Redirect, Route, Switch, BrowserRouter as Router, Link} from "react-router-dom";
import {Card, Button} from "react-bootstrap";
function Home({ match }) {
  const { data, loading, error } = useQuery(LOAD_USER_LABS, {
    variables: { user: match.params.name },
  });

  const getLabItems = () => {
    if (data != undefined) {
        console.log(data)
    }
  };

  const renderCard = (card, index) => {
    return (
        <Card className="box">
        <Card.Body>
          <p className="labname">{card.labName}</p>
          <p className="labdes">{card.labDescription}</p>
        <Link to={`/view/${card.labName}`}>View</Link>
        </Card.Body>
      </Card>
    );
  };
  return (
    <div className="home" onLoad={getLabItems()}>
      <h3>Hello {match.params.name}</h3>
      <h3><u>Your labs</u></h3>
      <div className="grid">
         {(data != undefined) ? data['labs'].map(renderCard): ""} 
      </div>
      
    </div>
  );
}

export default Home;
