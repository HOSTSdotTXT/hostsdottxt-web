import IconButton from './IconButton.js'
import React from 'react'

export default function Record(props) {
  return (
    <div class="records-tr" role="row">
      <div class="records-td records-col-type">{props.type}</div>
      <div class="records-td records-col-name">{props.name}</div>
      <div class="records-td records-col-value">
        {props.value}
        {props.recordSpecial}
      </div>
      <div class="records-td records-col-ttl">{props.ttl}</div>
      <div class="records-td records-col-actions">
        <IconButton icon="pencil" action={() => props.setAndOpenRecord()}>
          (edit)
        </IconButton>
        <IconButton icon="trash" action={() => props.deleteRecord()}>
          (delete)
        </IconButton>
      </div>
    </div>
  )
}
