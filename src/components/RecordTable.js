import React from "react";
import Record from "./Record";

// ENUM: sort columns: name, type, value
const sortColumns = Object.freeze({
  TYPE: "type",
  NAME: "name",
  VALUE: "value",
});

const sortDirections = Object.freeze({
  UP: "up",
  DOWN: "down",
});

function sort(records, direction, smart, column) {
  let sortVal = records.map((record) => [record, record[column]]);
  if (smart && column === sortColumns.NAME) {
    sortVal = records.map((record) => [
      record,
      record.name.split(".").reverse().join("."),
    ]);
  }
  sortVal = sortVal.sort((a, b) => {
    if (a[1] > b[1]) {
      return 1;
    }
    if (a[1] < b[1]) {
      return -1;
    }
    return 0;
  });
  if (direction === sortDirections.DOWN) {
    sortVal = sortVal.reverse();
  }
  return sortVal.map((record) => record[0]);
}

export default function RecordsTable({
  records,
  setAndOpenRecord,
  deleteRecord,
}) {
  return (
    // checkbox here that toggles smart sorting
    <div role="table" class="table">
      <div class="records-thead" role="rowgroup">
        <div class="records-tr" role="row">
          <div class="records-th records-col-type">
            Type{" "}
            {/* We need to put a button here which switches sorting direction and column*/}
          </div>
          <div class="records-th records-col-name">Name</div>
          <div class="records-th records-col-value">Value</div>
          <div class="records-th records-col-ttl">TTL</div>
          <div class="records-th records-col-actions"></div>
        </div>
      </div>
      <div class="records-tbody" role="rowgroup">
        {records != null &&
          sort(records, sortDirections.UP, true, sortColumns.TYPE).map(
            (val) => {
              return (
                <Record
                  id={val.id}
                  type={val.type}
                  name={val.name}
                  value={val.content}
                  ttl={val.ttl}
                  setAndOpenRecord={() => setAndOpenRecord(val)}
                  deleteRecord={() => deleteRecord(val.id)}
                ></Record>
              );
            }
          )}
      </div>
    </div>
  );
}
