import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useParams,
} from "react-router-dom";
import EachCard from "./EachCard";
import "./CardDesign.css";
const GridView = ({ data }) => {
  return (
    <div className="card-grid">
      {data.map((card) => (
        <Link key={card.id} to={`/card/${card.id}`}>
          <EachCard className="card" data={card} />
        </Link>
      ))}
    </div>
  );
};

export default GridView;
