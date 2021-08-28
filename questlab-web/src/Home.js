import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { LOAD_USER_LABS } from "./GraphQL/Queries";
import "./components/css/Home.css";
import {
  Redirect,
  Route,
  Switch,
  BrowserRouter as Router,
  Link,
} from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import Navbar from "./components/Navbar";

function Home({ match }) {
  const { data, loading, error } = useQuery(LOAD_USER_LABS, {
    variables: { user: match.params.name },
  });

  const getLabItems = () => {
    if (data != undefined) {
      console.log(data);
    }
  };

  const renderCard = (card, index) => {
    return (
      <Card className="box">
        <Card.Body className="box-content">
          <p className="labname">{card.labName}</p>
          <p className="labdes">{card.labDescription}</p>
          <a href={`/view/${match.params.name}/${card.id}`}><p className="view-btn" > View</p></a>
        </Card.Body>
      </Card>
    );
  };
  return (
    <div className="home-main">
      <Navbar user={match.params.name} />
      <div className="banner">
        <p className="banner-text">Welcome, {match.params.name}<br/>
        <a href="#hidden"><span className="banner-sub">View Labs</span></a>
        </p>
        <p class="hidden" id="hidden">
          hello
        </p>
      </div>
      <div className="cards" id="cards">
        <div className="home" onLoad={getLabItems()}>
          <h3 className="labs-title" id="labs">
            Your labs
          </h3>
          <div className="grid">
            {data != undefined ? data["labs"].map(renderCard) : ""}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
