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

const CardDetailPage = ({ cardsData }) => {
  const { id } = useParams();
  const selectedCard = cardsData.find((card) => card.id === parseInt(id));
  return (
    <div className="card-detail-page">
      <CardDetails data={selectedCard} />
    </div>
  );
};
export default CardGrid;
