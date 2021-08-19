import React from "react";
import "./components/css/View.css";
import { useQuery } from "@apollo/client";
import { LOAD_LAB_DETAILS } from "./GraphQL/Queries";

function View({ match }) {
  let temp = match.params.lab;
  let labname = "";
  try {
    labname = temp.replace("%20", " ");
  } catch (err) {
    labname = temp;
  }

  const { data, loading, error } = useQuery(LOAD_LAB_DETAILS, {
    variables: { labname: temp },
  });

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
      <h3>{temp}</h3>
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
