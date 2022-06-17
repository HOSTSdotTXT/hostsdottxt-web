// Meow meow meow meow
import {styled} from "@stitches/react";
import React from "react";
import "./Records.css";
import RecordTable from "../components/RecordTable";

export function Records() {
  return (
    <main class="records-table-container">
      <h1>DNS Records for example.com</h1>
      <RecordTable></RecordTable>
    </main>
  );
}

export default Records;
