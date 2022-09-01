import Button from '../uikit/Button'
import Record from './Record'
import React from 'react'

// ENUM: sort columns: name, type, value
const sortColumns = Object.freeze({
  TYPE: 'type',
  NAME: 'name',
  VALUE: 'value',
})

const sortDirections = Object.freeze({
  UP: 'up',
  DOWN: 'down',
})

function sort(records, direction, smart, column) {
  let sortVal = records.map((record) => [record, record[column]])
  if (smart && column === sortColumns.NAME) {
    sortVal = records.map((record) => [
      record,
      record.name.split('.').reverse().join('.'),
    ])
  }
  sortVal = sortVal.sort((a, b) => {
    if (a[1] > b[1]) {
      return 1
    }
    if (a[1] < b[1]) {
      return -1
    }
    return 0
  })
  if (direction === sortDirections.DOWN) {
    sortVal = sortVal.reverse()
  }
  return sortVal.map((record) => record[0])
}

export default function RecordsTable({
  records,
  setAndOpenRecord,
  deleteRecord,
}) {
  return (
    // checkbox here that toggles smart sorting
    <div role="table" className="table">
      <div className="records-thead" role="rowgroup">
        <div className="records-tr" role="row">
          <div className="records-th records-col-type">
            Type{' '}
            {/* We need to put a button here which switches sorting direction and column*/}
          </div>
          <div className="records-th records-col-name">Name</div>
          <div className="records-th records-col-value">Value</div>
          <div className="records-th records-col-ttl">TTL</div>
          {/* TODO: Stop using NBSP for styling */}
          <div className="records-th records-col-actions">
            <Button
              onClick={() =>
                setAndOpenRecord({
                  name: '',
                  content: '',
                  ttl: 300,
                  type: 'A',
                })
              }
              primary
            >
              Add
            </Button>
          </div>
        </div>
      </div>
      <div className="records-tbody" role="rowgroup">
        {records != null &&
          sort(
            sort(
              records.filter((r) => r.type != 'NS'),
              sortDirections.UP,
              true,
              sortColumns.NAME
            ),
            sortDirections.UP,
            true,
            sortColumns.TYPE
          ).map((val) => {
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
            )
          })}
      </div>
    </div>
  )
}
