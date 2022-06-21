// Meow meow meow meow
import { styled } from "@stitches/react";
import React, { useEffect } from "react";
import "./Records.css";
import RecordTable from "../components/RecordTable";
import useFetch from "../hooks/useFetch";
import { useParams } from "react-router-dom";

export function Records() {
  let { zoneName } = useParams();

  const zone = useFetch("/fdns.dev.json");
  console.log(zone)

  return (
    <main class="records-table-container">
      <h1>DNS Records for {zoneName}</h1>
      <RecordTable records={zone.data}></RecordTable>
    </main>
  );
}

export default Records;
