import React from "react";
import Record from "./Record";

export default class RecordTable extends React.Component {
  render() {
    const records = [
      {type: "AAAA", name: "oracle-arm-toronto-1.vm.origin", value: "2603:c021:1:e9fe::ff", ttl: "1 day"},
      {type: "AAAA", name: "oracle-arm-toronto-1.vm.origin", value: "2603:c021:1:e9fe::ff", ttl: "1 day"},
      {type: "AAAA", name: "oracle-arm-toronto-1.vm.origin", value: "2603:c021:1:e9fe::ff", ttl: "1 day"},
    ];
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
          {
            records.map((val, key) => {
              return (
                <Record id={key} type={val.type} name={val.name} value={val.value} ttl={val.ttl}></Record>
              )
            })
          }
        </div>
      </div>
    );
  }
}