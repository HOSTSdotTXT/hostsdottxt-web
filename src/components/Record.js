import { forHumans } from '../utils'
import IconButton from './IconButton.js'
import React from 'react'

export default function Record(props) {
  return (
    <div className="records-tr" role="row">
      <div className="records-td records-col-type">{props.type}</div>
      <div className="records-td records-col-name">{props.name}</div>
      <div className="records-td records-col-value">
        {props.value}
        {props.recordSpecial}
      </div>
      <div className="records-td records-col-ttl">{forHumans(props.ttl)}</div>
      <div className="records-td records-col-actions">
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
