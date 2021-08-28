import React from "react";
import "./components/css/View.css";
import { useQuery } from "@apollo/client";
import { LOAD_LAB_DETAILS } from "./GraphQL/Queries";
import Navbar from "./components/Navbar";

function View({ match }) {
  let temp = match.params.lab;

  const { data, loading, error } = useQuery(LOAD_LAB_DETAILS, {
    variables: { labid: temp },
  });

  console.log(data);
  const renderLabItems = (card, index) => {
    return (
        <li>
            <div class="time">{card.milestone}</div>
            <p>{card.mileDes}</p>
      </li>
    );
  };

  const renderResourceItems = (card, index) => {  
    return (
        <li>
            <div class="time"><a href={card.resource} target="_blank">{card.resource}</a></div>
      </li>
    );
  };


  return (
    <div className="view">
      <Navbar user={match.params.name} />
      <div className="title">
        <h3>{(data!=undefined) ? data.labDetails[0].baseInfo.labName : " "}</h3>
      </div>
      <div className="about">
        <h4>About</h4>
        <p>{(data != undefined) ? data["labDetails"][0]["longDescription"] : ""}</p>
      </div>
      <div class="container">
        <div class="wrapper">
          <h1> Milestones</h1>
          <ul class="sessions">
            {(data!=undefined) ? data['milestones'].map(renderLabItems): "No milestones added"}
          </ul>
        </div>
      </div>
      <div className="resources">
      <div class="container">
        <div class="wrapper">
          <h1>Resources</h1>
          <ul class="sessions">
            {(data!=undefined) ? data['resources'].map(renderResourceItems): "No milestones added"}
          </ul>
        </div>
      </div>
      </div>
    </div>
  );
}

export default View;
