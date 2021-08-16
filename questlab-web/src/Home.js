import React, { useEffect, useState } from "react";
import { useQuery} from "@apollo/client";
import {LOAD_USER_LABS } from "./GraphQL/Queries";
import './index.css';

function Home({user}) {

    const {data, loading, error} = useQuery(LOAD_USER_LABS, {variables:{user:user}});

    const getLabItems = () => {
        console.log(data)
    };
    return (
        
        <div className="welcome" onLoad={getLabItems()}>
            <h2>Hello {user}</h2>
        </div>
    )
}

export default Home
