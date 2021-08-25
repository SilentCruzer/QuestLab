import React, { useEffect, useState } from "react";
import "./components/css/Create.css";
import Navbar from "./components/Navbar";
import { LOAD_USER_ID } from "./GraphQL/Queries";
import {
  CREATE_LAB,
  CREATE_LAB_DETAILS,
  CREATE_RESOURCE,
  CREATE_MILESTONE
} from "./GraphQL/Mutations";
import { useQuery, useMutation } from "@apollo/client";

function Create({ match }) {
  const [addlab, { labdata, labloading, laberror }] = useMutation(CREATE_LAB);
  const [addDetails, { detailsdata, detailsloading, detailserror }] =
    useMutation(CREATE_LAB_DETAILS);
  const [addResource, { resourcedata, resourceloading, resourceError }] =
    useMutation(CREATE_RESOURCE);
  const [addMilestone, { taskata,taskloading, taskerror }] =
    useMutation(CREATE_MILESTONE);
  const [labname, setName] = useState("");
  const [shortdes, setDes] = useState("");
  const [about, setAbout] = useState("");
  const [tasks, setTasks] = useState("");
  const [resources, setRes] = useState("");
  const [phase, setPhase] = useState(false);

  const { data, loading, error } = useQuery(LOAD_USER_ID, {
    variables: { username: match.params.user },
  });

  const createLab = () => {
    var dataId;
    if (data != undefined) {
      dataId = data.userId[0].id;
    } else {
      dataId = "1";
    }
    var res_list = resources.split(",");
    addlab({
      variables: {
        labName: labname,
        labDescription: shortdes,
        user: dataId,
      },
    });
    addDetails({
      variables: {
        labName: labname,
        longDescription: about,
      },
    });

    for (var i = 0; i < res_list.length; i++) {
      addResource({
        variables: {
          labName: labname,
          resource: res_list[0],
        },
      });
    }
    getArray()
  };

  const createHandler = (e) => {
    e.preventDefault();
    createLab();
  };
  const nextHandler = () => {
    setPhase(true);
  };

  const renderForm = (item, index) => {
    return (
      <div className="form-group">
        <label htmlFor="taskdes">{item}</label>
        <textarea
          id="taskdes"
          name="taskdes"
          rows="2"
          cols="50"
        />
      </div>
    );
  };

  const getArray = () => {
    var taskdes= document.getElementsByName("taskdes");
    var taskList = tasks.split(",")
    console.log(taskdes);
    console.log(taskList);
    for(var i=0;i<taskdes.length; i++){
      addMilestone({
          variables: {
            labName: labname,
            milestone: taskList[i],
            mileDes: taskdes[i].value,
          },
        });
    }
  }

  return (
    <div className="create-main">
      <Navbar user={match.params.user} />
      <div className="create">
        <div className="form-container">
          <div className="formbox">
            <form onSubmit={createHandler}>
              <div className="form-group">
                <h2>Create Lab</h2>
                {phase ? (
                  <div className="secondphase">
                    {tasks.split(",").map(renderForm)}
                    <div className="form-group">
                      <input type="submit" value="Submit"/>
                    </div>
                  </div>
                ) : (
                  <div className="firstphase">
                    <div className="form-group">
                      <label htmlFor="name">Lab Name:</label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="shortdes">Short Description:</label>
                      <textarea
                        id="shortdes"
                        name="shortdes"
                        rows="2"
                        cols="50"
                        onChange={(e) => {
                          setDes(e.target.value);
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="about">About:</label>
                      <textarea
                        id="about"
                        name="about"
                        rows="4"
                        cols="50"
                        onChange={(e) => {
                          setAbout(e.target.value);
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="tasks">Tasks:</label>
                      <textarea
                        id="tasks"
                        name="tasks"
                        rows="4"
                        cols="50"
                        onChange={(e) => {
                          setTasks(e.target.value);
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="resources">Resources:</label>
                      <textarea
                        id="resources"
                        name="resources"
                        rows="4"
                        cols="50"
                        onChange={(e) => {
                          setRes(e.target.value);
                        }}
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="submit"
                        value="Next"
                        onClick={() => nextHandler()}
                      />
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Create;
