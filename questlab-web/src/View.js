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

  return (
    <div className="view">
      <div class="container">
        <div class="wrapper">
          <h1> Milestones</h1>
          <ul class="sessions">
            {(data!=undefined) ? data['milestones'].map(renderLabItems): ""}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default View;
