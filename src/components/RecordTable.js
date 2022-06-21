import React from "react";
import Record from "./Record";

export default function RecordsTable({ records }) {
  console.log(records)
  return (
    <div role="table" class="table">
      <div class="records-thead" role="rowgroup">
        <div class="records-tr" role="row">
          <div class="records-th records-col-type">Type</div>
          <div class="records-th records-col-name">Name</div>
          <div class="records-th records-col-value">Value</div>
          <div class="records-th records-col-ttl">TTL</div>
          <div class="records-th records-col-actions"></div>
        </div>
      </div>
      <div class="records-tbody" role="rowgroup">
        {records != null && 
          records.map((val) => {
            return (
              <Record id={val.id} type={val.type} name={val.name} value={val.content} ttl={val.ttl}></Record>
            )
          })
        }
      </div>
    </div>
  );
}