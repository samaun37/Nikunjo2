import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useParams,
} from "react-router-dom";
import GridView from "./GridView";
import CardDetails from "./CardDetails"; // Import the CardDetailComponent

const CardGrid = ({ data }) => {
  return (
    <>
      <GridView data={data} />
    </>
  );
};

export default CardGrid;
