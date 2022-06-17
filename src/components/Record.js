import React from "react";
import IconButton from "./IconButton.js";

export default class Record extends React.Component {
  render() {
    console.log(this)
    return (
      <div class="records-tr" role="row">
        <div class="records-td records-col-type">{this.props.type}</div>
        <div class="records-td records-col-name">{this.props.name}</div>
        <div class="records-td records-col-value">{this.props.value}{this.props.recordSpecial}</div>
        <div class="records-td records-col-ttl">{this.props.ttl}</div>
        <div class="records-td records-col-actions">
          {/* <IconButton icon="pencil" action={editSelf()}></IconButton> */}
          {/* <IconButton icon="trash" action={deleteSelf()}></IconButton> */}
        </div>
      </div>
    );
  }
}